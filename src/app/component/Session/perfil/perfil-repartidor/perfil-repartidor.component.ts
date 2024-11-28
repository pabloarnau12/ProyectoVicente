import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../service/auth.service';
import { Router } from '@angular/router';
import { ImageUploadService } from '../../../../service/image-upload.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ordersService } from '../../../../service/orders.service';

@Component({
  selector: 'app-perfil-repartidor',
  standalone: true,
  imports: [
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,  
    MatIconModule,  
  ],
  templateUrl: './perfil-repartidor.component.html',
  styleUrl: './perfil-repartidor.component.css'
})
export class PerfilRepartidorComponent implements OnInit {
  user: any = {};
  selectedFile: File | null = null;
  isloading: Boolean = false;
  pedidos: any[] = []


  ngOnInit(): void {
    this.loadProfile();
  }

constructor(private authService: AuthService, private router: Router, private imageUploadService: ImageUploadService , private pedidosService: ordersService ){
  
}

  loadProfile(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.getProfile(token).subscribe(
        (profile) => {
          this.user = profile;
          console.log('Perfil cargado:', this.user); // Para depuración
          this.loadOrders();
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

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/home']).then(() => {
      // Forzar la recarga de la página
      window.location.reload();
    });
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

  updateStatus(newStatus: string): void {
    this.isloading = true;
    const token = localStorage.getItem('token');

    if(token){
      this.authService.updateStatus(newStatus, token).subscribe(
        (response) => {
          console.log('Estado actualizado:', response);
          this.user.estado = newStatus; // Actualiza el estado en el front
          Swal.fire('Estado actualizado', `Tu estado ahora es: ${newStatus}`, 'success');
          this.isloading = false;
          this.loadProfile();
        },
        (error) => {
          console.error('Error al actualizar el estado', error);
          Swal.fire('Error', 'No se pudo actualizar tu estado. Intenta de nuevo.', 'error');
          this.isloading = false;
        }
      );
    }
    else{
      console.error('No se encontró el token');
      this.onLogout();
    }
  

  }

  loadOrders(){
    this.pedidosService.OrdersByState('Pendiente').subscribe(
      (response) => {
        this.pedidos = response;
      },
      (error)=>{
        console.error("Error: ", error)
      }
    )
  }
  

}
