import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterRequest } from '../../../common/Auth'; // Importar la interfaz

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
    // Crear un objeto que cumpla con la interfaz RegisterRequest
    const registerData: RegisterRequest = {
      nombre: this.nombre,
      apellidos: this.apellidos,
      email: this.email,
      telefono: this.telefono,
      password: this.password,
    };

    this.authService.register(registerData).subscribe(
      (response) => {
        console.log('Registro exitoso', response);
        alert('Usuario registrado con éxito');
        this.router.navigate(['/home']).then(() => {
          window.location.reload();
        });
      },
      (error) => {
        console.error('Error en el registro', error);
      }
    );
  }
}
