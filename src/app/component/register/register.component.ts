import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  nombre: string = '';
  apellidos: string = '';
  telefono: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  register() {
    this.authService.register(this.nombre, this.apellidos, this.telefono, this.email, this.password).subscribe(
      response => {
        console.log('Registro exitoso', response);
      },
      error => {
        console.error('Error en el registro', error);
      }
    );
  }
}
