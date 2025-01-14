import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../../service/auth.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { MatIcon } from '@angular/material/icon';
import { ordersService } from '../../../../service/orders.service';
import { FavoriteShopService } from '../../../../service/favorite-shop.service';
import { ImageUploadService } from '../../../../service/image-upload.service';


@Component({
  selector: 'app-perfil-client',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './perfil-client.component.html',
  styleUrl: './perfil-client.component.css'
})
export class PerfilClientComponent implements OnInit{
  user: any = {};
  ActiveOrders = signal<any[]>([]);
  FavoriteShops = signal<any[]>([]);
  tienda: any;  
  selectedFile: File | null = null;
  isloading: Boolean = false;

  constructor(private authService: AuthService, private router: Router, private pedidosService: ordersService, private imageUploadService: ImageUploadService ) { }
  private readonly apiFavoriteShops : FavoriteShopService = inject(FavoriteShopService)
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
          this.pedidosActivos();
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


  pedidosActivos(): void {
    // const token = localStorage.getItem('token');

      this.pedidosService.activeOrders(this.user.ID_Usuario).subscribe(
        (orders) => {
          this.ActiveOrders.set(orders);
          console.log('PEDIDOS cargados:', this.ActiveOrders); // Para depuración
        },
        (error) => {
          console.error('error al cargar perfiles', error);
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
}
