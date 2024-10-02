import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  standalone: true,
  imports: [FormsModule],
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  // Usamos un objeto para almacenar la información del usuario
  user = {
    nombre: '',
    apellidos: '',
    telefono: '',
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loadProfile();
  }

  // Cargar el perfil del usuario
  loadProfile(): void {
    const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
    if (token) {
      this.authService.getProfile(token).subscribe(
        profile => {
          // Asignar la información del perfil al objeto user
          this.user.nombre = profile.nombre;
          this.user.apellidos = profile.apellidos;
          this.user.telefono = profile.telefono;
          this.user.email = profile.email;
          console.error('Perfil cargado');
        },
        error => {
          console.error('Error al cargar el perfil', error);
        }
      );
    } else {
      console.error('No se encontró el token');
    }
  }


  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/home']).then(() => {
      // Forzar la recarga de la página
      window.location.reload();
    });
  }

}
