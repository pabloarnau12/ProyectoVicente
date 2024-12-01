import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common'; // Importa CommonModule aquí
import { MatIconModule } from '@angular/material/icon';
import { CarritoComponent } from "../carrito/carrito.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, MatIconModule, CarritoComponent],
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
    if(token){
      this.authService.getProfile(token).subscribe({
        next:() =>{
            this.isLoggedIn = true;
            console.log("usuario sesionado");
        },
        error : () => {
            this.isLoggedIn = false;
            console.log("usuario no sesionado")
        }
      })
    }
    
    // this.isLoggedIn = !!token;
  }
}