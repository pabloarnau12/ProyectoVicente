import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../service/auth.service';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { ImageUploadService } from '../../../../service/image-upload.service';
import { FormsModule } from '@angular/forms';
import { Tiendas } from '../../../../common/Tiendas';
import { ApiService } from '../../../../service/shop.service';

@Component({
  selector: 'app-perfil-admin',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './perfil-admin.component.html',
  styleUrl: './perfil-admin.component.css'
})
export class PerfilAdminComponent{
  protected readonly authService: AuthService = inject(AuthService);
  protected readonly imageUploadService: ImageUploadService = inject(ImageUploadService);
  protected readonly shopService: ApiService = inject(ApiService);
  user: any = {};
  tienda: any = {};
  Horario_Apertura: any;
  Horario_Cierre: any;
  selectedFile: File | null = null;
  isloading: Boolean = false;

  constructor(private router: Router){
    this.loadProfile();
    
  }

  loadProfile(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.getProfile(token).subscribe(
        (profile) => {
          this.user = profile;
          console.log('Perfil cargado:', this.user); // Para depuración
          this.loadTienda();
        },
        (error) => {
          console.error('Error al cargar el perfil', error);
          this.onLogout()
        }
      );
    } else {
      console.error('No se encontró el token');
      this.onLogout();
    }
  }

  loadTienda(): void {
      this.shopService.getShopByAdmin(this.user.ID_Usuario).subscribe(
        (tienda) => {
          this.tienda = tienda;
          console.log('Tienda cargada:', this.tienda); // Para depuración
          this.Horario_Apertura = this.tienda.Horario_Apertura;
          this.Horario_Cierre = this.tienda.Horario_Cierre;
        },
        (error) => {
          console.error('Error al cargar la tienda', error);
        }
      );
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

    onFileChange(event: any) {
      this.selectedFile = event.target.files[0];
    }
    onSubmit() {
      if (this.selectedFile) {
        this.isloading = true;
        this.imageUploadService.uploadImage(this.selectedFile).subscribe({
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

    onSubmitHorario() {
      const token = localStorage.getItem('token');
      if (token) {
        this.authService.updateHorario(this.Horario_Apertura, this.Horario_Cierre, this.tienda.ID_Establecimiento, token).subscribe(
          (response: any) => {
            Swal.fire({
              icon: 'success',
              title: '¡Horario Actualizado!',
              text: 'El horario de apertura ha sido actualizado correctamente.',
            });
          },
          (error: any) => {
            console.error('Error al actualizar el horario', error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Hubo un error al actualizar el horario. Por favor, intenta nuevamente.',
            });
          }
        );
      }else{
        this.onLogout();
      }

    }
}
