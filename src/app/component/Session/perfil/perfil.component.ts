import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  standalone: true,
  imports: [FormsModule, MatIcon],
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

  async tryfuncion() {
    const { value: address } = await Swal.fire({
      title: "Enter your new address",
      input: "text",
      inputLabel: "Your new address",
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
  

}
