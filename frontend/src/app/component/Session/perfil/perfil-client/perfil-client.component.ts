import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../../service/auth.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { MatIcon } from '@angular/material/icon';
import { ordersService } from '../../../../service/orders.service';
import { FavoriteShopService } from '../../../../service/favorite-shop.service';
import { ImageUploadService } from '../../../../service/image-upload.service';
import { Console } from 'console';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-perfil-client',
  standalone: true,
  imports: [FormsModule, RouterLink, ReactiveFormsModule, DatePipe],
  templateUrl: './perfil-client.component.html',
  styleUrl: './perfil-client.component.css',
})
export class PerfilClientComponent implements OnInit {
  user: any = {};
  ActiveOrders = signal<any[]>([]);
  FavoriteShops = signal<any[]>([]);
  mostrarPedidosRealizados: boolean = false;
  CompletedOrders: any = [];
  tienda: any;
  selectedFile: File | null = null;
  isloading: Boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private pedidosService: ordersService,
    private imageUploadService: ImageUploadService
  ) {}
  private readonly apiFavoriteShops: FavoriteShopService =
    inject(FavoriteShopService);
  private readonly FormBuilder: FormBuilder = inject(FormBuilder);

  FormUser: FormGroup = this.FormBuilder.group({
    Nombre: ['', Validators.required],
    Apellidos: ['', Validators.required],
    Email: [{ value: this.user.Email, disabled: true }, Validators.required],
    Telefono: [
      { value: this.user.Telefono, disabled: true },
      Validators.required,
    ],
  });

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.getProfile(token).subscribe(
        (profile) => {
          this.user = profile;

          this.FormUser.patchValue(this.user);
          this.pedidosActivos('En Proceso');
          this.pedidosRealizados('Cancelado');
          this.getFavoriteShops();
        },
        (error) => {
          console.error('Error al cargar el perfil', error);
          this.onLogout();
        }
      );
    } else {
      console.error('No se encontró el token');
    }
  }

  get nombre() {
    return this.FormUser.get('Nombre');
  }

  get apellidos() {
    return this.FormUser.get('Apellidos');
  }

  get email() {
    return this.FormUser.get('Email');
  }

  get telefono() {
    return this.FormUser.get('Telefono');
  }

  secondOportunityLogout() {
    Swal.fire({
      title: '¿Seguro que quieres marcharte?',
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: `Cerrar Sesión`,
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isDenied) {
        this.onLogout();
      }
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }

  async tryfuncion() {
    const { value: address } = await Swal.fire({
      title: 'Introduce tu nueva dirección',
      input: 'text',
      inputLabel: 'Nueva dirección',
      inputValue: '',
      showCancelButton: true,
    });

    if (address) {
      Swal.fire(`Tu nueva dirección es ${address}`);
      const token = localStorage.getItem('token');

      if (token) {
        const addressData = { direccion: address };
        this.authService.updateAddress(addressData, token).subscribe(
          (response) => {
            Swal.fire(response.message);
            this.loadProfile();
          },
          (error) => {
            console.error('Error al actualizar la dirección:', error);
            Swal.fire('Error al actualizar la dirección');
          }
        );
      } else {
        console.error('No se ha proporcionado el Token');
      }
    }
  }

  pedidosActivos(estado: string): void {
    this.pedidosService
      .OrdersByUserAndState(this.user.ID_Usuario, estado)
      .subscribe(
        (orders) => {
          this.ActiveOrders.set(orders);
        },
        (error) => {
          console.error('Error al cargar pedidos:', error);
        }
      );
  }

  pedidosRealizados(estado: string): void {
    this.pedidosService
      .OrdersByUserAndState(this.user.ID_Usuario, estado)
      .subscribe(
        (orders) => {
          this.CompletedOrders = orders;
        },
        (error) => {
          console.error('Error al cargar pedidos realizados:', error);
        }
      );
  }
  getFavoriteShops(): void {
    this.apiFavoriteShops
      .getFavoriteShopsByUser(this.user.ID_Usuario)
      .subscribe(
        (shops) => {
          this.FavoriteShops.set(shops);
        },
        (error) => {
          console.error('Error al cargar las tiendas favoritas', error);
        }
      );
  }

  deleteFavorite(event: Event, ID_Establecimiento: string): void {
    event.stopPropagation();

    this.apiFavoriteShops
      .removeFavoriteShop(this.user.ID_Usuario, ID_Establecimiento)
      .subscribe(
        () => {
          this.FavoriteShops.update((shops) =>
            shops.filter(
              (shop) => shop.ID_Establecimiento !== ID_Establecimiento
            )
          );
        },
        (error) => Swal.fire('Error al eliminar la tienda de favoritos')
      );
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }
  onSubmit() {
    if (this.selectedFile) {
      this.isloading = true;
      this.imageUploadService.uploadProfileImage(this.selectedFile).subscribe({
        next: (response: any) => {
          this.loadProfile();
          this.isloading = false;
        },
        error: (error) => {
          console.error('Error al subir la imagen:', error);
        },
      });
    }
  }

  onUpdateUser() {
    if (this.FormUser.valid) {
      const token = localStorage.getItem('token');
      if (token) {
        this.authService
          .updateUserProfile(this.FormUser.value, token)
          .subscribe(
            (response) => {
              Swal.fire('Información actualizada', response.message, 'success');
              this.loadProfile();
            },
            (error) => {
              console.error(
                'Error al actualizar la información del usuario',
                error
              );
              Swal.fire(
                'Error',
                'No se pudo actualizar la información del usuario',
                'error'
              );
            }
          );
      } else {
        console.error('No se encontró el token');
      }
    } else {
      Swal.fire(
        'Error',
        'Por favor, completa todos los campos requeridos',
        'error'
      );
    }
  }
  togglePedidosRealizados(): void {
    this.mostrarPedidosRealizados = !this.mostrarPedidosRealizados;
  }
}
