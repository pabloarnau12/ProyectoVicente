import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../../service/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
  styleUrl: './perfil-client.component.css'
})
export class PerfilClientComponent implements OnInit{
  user: any = {};
  ActiveOrders = signal<any[]>([]);
  FavoriteShops = signal<any[]>([]);
  mostrarPedidosRealizados: boolean = false;
  CompletedOrders: any = [];
  tienda: any;  
  selectedFile: File | null = null;
  isloading: Boolean = false;
// Nueva variable para almacenar los pedidos realizados


// Método para cargar los pedidos realizados

  constructor(private authService: AuthService, private router: Router, private pedidosService: ordersService, private imageUploadService: ImageUploadService ) { }
  private readonly apiFavoriteShops : FavoriteShopService = inject(FavoriteShopService)
  private readonly FormBuilder : FormBuilder = inject(FormBuilder);

  FormUser: FormGroup = this.FormBuilder.group({
    // ID_Usuario: [this.user.ID_Usuario, Validators.required], 
    Nombre: ['', Validators.required],
    Apellidos: ['', Validators.required],
    Email: [{ value: this.user.Email, disabled: true }, Validators.required],
    Telefono: [{ value: this.user.Telefono, disabled: true }, Validators.required]
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
          console.log('Perfil cargado:', this.user); // Para depuración
          this.FormUser.patchValue(this.user);
          this.pedidosActivos('En Proceso');
          this.pedidosRealizados('Cancelado'); // Cargar pedidos realizados
          this.getFavoriteShops();
        },
        (error) => {
          console.error('Error al cargar el perfil', error);
          this.onLogout()
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
  
  secondOportunityLogout(){
    Swal.fire({
      title: "¿Seguro que quieres marcharte?",
      showDenyButton: true, 
      showCancelButton: true, 
      showConfirmButton: false,
      denyButtonText: `Cerrar Sesión`, 
      cancelButtonText: 'Cancelar', 

    }).then((result) => {
      if (result.isDenied) {
        this.onLogout(); // Llama a la función para cerrar sesión
      }
    });
    
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/home']).then(() => {
      // Forzar la recarga de la página
      window.location.reload();
    });
  }

  async tryfuncion() {
    const { value: address } = await Swal.fire({
      title: "Introduce tu nueva dirección",
      input: "text",
      inputLabel: "Nueva dirección",
      inputValue: "",
      showCancelButton: true,
    });
  
    if (address) {
      Swal.fire(`Tu nueva dirección es ${address}`);
      const token = localStorage.getItem('token');
      console.log("Token obtenido:", token); // Agrega esto para verificar el token

      if (token) {
        this.authService.updateAddress(address, token).subscribe(
          response => {
            console.log("Respuesta del servidor:", response);
            Swal.fire(response.message); // Mostrar mensaje de éxito
            this.loadProfile();
          },
          error => {
            console.error("Error al actualizar la dirección:", error);
            Swal.fire("Error al actualizar la dirección"); // Mostrar mensaje de error
          }
        );
        console.log("Dirección enviada al backend:", address);
      } else {
        console.error("No se ha proporcionado el Token");
      }
    }
  }


  pedidosActivos(estado: string): void {
    this.pedidosService.OrdersByUserAndState(this.user.ID_Usuario, estado).subscribe(
      (orders) => {
        this.ActiveOrders.set(orders);
        console.log('PEDIDOS cargados:', this.ActiveOrders); // Para depuración
      },
      (error) => {
        console.error('Error al cargar pedidos:', error);
      }
    );
  }

  pedidosRealizados(estado: string): void {
    this.pedidosService.OrdersByUserAndState(this.user.ID_Usuario, estado).subscribe(
      (orders) => {
        this.CompletedOrders = orders;
        console.log('PEDIDOS REALIZADOS cargados:', this.CompletedOrders); // Para depuración
      },
      (error) => {
        console.error('Error al cargar pedidos realizados:', error);
      }
    );
  }
  getFavoriteShops(): void {
    this.apiFavoriteShops.getFavoriteShopsByUser(this.user.ID_Usuario).subscribe(
      (shops) => {
        this.FavoriteShops.set(shops); 
        console.log("Datos cargados en el signal:", shops); 

      },
      (error) => {
        console.error("Error al cargar las tiendas favoritas", error);
      }
    );
  }

  deleteFavorite(event: Event, ID_Establecimiento : string): void {

    event.stopPropagation();
    
    this.apiFavoriteShops.removeFavoriteShop(this.user.ID_Usuario, ID_Establecimiento).subscribe(
      () => {
        this.FavoriteShops.update(shops => 
          shops.filter(shop => shop.ID_Establecimiento !== ID_Establecimiento)
        );
      },
      error => Swal.fire('Error al eliminar la tienda de favoritos')
    );
  }
  

//  subida de imagen de perfil
onFileChange(event: any) {
  this.selectedFile = event.target.files[0];
}
onSubmit() {
  if (this.selectedFile) {
    this.isloading = true;
    this.imageUploadService.uploadProfileImage(this.selectedFile).subscribe({
      next: (response: any) => {
        console.log('Imagen subida:', response.url);
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
  console.log(this.FormUser.value)
  if (this.FormUser.valid) {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.updateUserProfile(this.FormUser.value, token).subscribe(
        (response) => {
          Swal.fire('Información actualizada', response.message, 'success');
          this.loadProfile();
        },
        (error) => {
          console.error('Error al actualizar la información del usuario', error);
          Swal.fire('Error', 'No se pudo actualizar la información del usuario', 'error');
        }
      );
    } else {
      console.error('No se encontró el token');
    }
  } else {
    Swal.fire('Error', 'Por favor, completa todos los campos requeridos', 'error');
  }
}
togglePedidosRealizados(): void {
  this.mostrarPedidosRealizados = !this.mostrarPedidosRealizados;
}
}


