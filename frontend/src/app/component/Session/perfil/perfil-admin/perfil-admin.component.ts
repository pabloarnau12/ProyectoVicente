import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../service/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ImageUploadService } from '../../../../service/image-upload.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './perfil-admin.component.html',
  styleUrl: './perfil-admin.component.css'
})
export class PerfilAdminComponent {
  protected readonly authService: AuthService = inject(AuthService);
  protected readonly imageUploadService: ImageUploadService = inject(ImageUploadService);
  user: any = {};
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
}
