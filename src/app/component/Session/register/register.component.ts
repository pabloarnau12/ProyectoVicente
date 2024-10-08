import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule aquí
import { Router } from '@angular/router';
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
  telefono: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router ) { }

  register() {
    this.authService.register(this.nombre, this.apellidos, this.email, this.telefono , this.password).subscribe(
      response => {
        console.log('Registro exitoso', response);
        alert('Usuario registrado con exito');
        this.router.navigate(['/home']).then(() => {
          // Forzar la recarga de la página
          window.location.reload();
        });
      },
      error => {
        console.error('Error en el registro', error);
      }
    );
  }
}
