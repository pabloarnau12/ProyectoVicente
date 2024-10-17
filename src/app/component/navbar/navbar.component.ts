import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common'; // Importa CommonModule aquí
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoggedIn: boolean = false;
  constructor(private authService: AuthService, private router: Router, ) { }

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  
  checkLoginStatus(): void {
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token; // Si hay un token, está logueado
  }
}
