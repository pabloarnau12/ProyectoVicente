import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, RouterLink, RouterLinkActive],
  standalone: true,
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);

        this.router.navigate(['/home']).then(() => {
          window.location.reload();
        });
      },
      (error) => {
        console.error('Error en el login papasito', error);

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Email o Contraseña Incorrectos',
        });
      }
    );
  }
}
