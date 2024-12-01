import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule aquí
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule,RouterLink, RouterLinkActive],
  standalone: true,
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        console.log('Login exitoso', response);
        this.router.navigate(['/home']).then(() => {
          // Forzar la recarga de la página
          window.location.reload();

        });
      },
      error => {
        console.error('Error en el login papasito', error);
                // Mostrar el mensaje de error usando SweetAlert2 o Toastr
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: "Email o Contraseña Incorrectos",
              });
      }
    );
  }
}
