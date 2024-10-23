import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  standalone: true,
  imports: [FormsModule],
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  // Usamos un objeto para almacenar la información del usuario
  user: any = {}; // Inicializa user como un objeto vacío

  constructor(private authService: AuthService, private router: Router) { }

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
        },
        (error) => {
          console.error('Error al cargar el perfil', error);
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

}
