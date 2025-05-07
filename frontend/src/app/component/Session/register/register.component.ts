import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterRequest } from '../../../common/Auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrarse',
  templateUrl: './register.component.html',
  standalone: true,
  styleUrls: ['./register.component.css'],
  imports: [FormsModule],
})
export class RegisterComponent {
  nombre: string = '';
  apellidos: string = '';
  email: string = '';
  telefono: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  register() {
    const registerData: RegisterRequest = {
      nombre: this.nombre,
      apellidos: this.apellidos,
      email: this.email,
      telefono: this.telefono,
      password: this.password,
    };

    this.authService.register(registerData).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'Usuario registrado con éxito',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          this.router.navigate(['/home']).then(() => {
            window.location.reload();
          });
        });
      },
      (error) => {
        console.error('Error en el registro', error);
        Swal.fire({
          icon: 'error',
          title: 'Error en el registro',
          text: 'Hubo un problema al registrar el usuario. Intenta nuevamente.',
          confirmButtonText: 'Aceptar',
        });
      }
    );
  }
}
