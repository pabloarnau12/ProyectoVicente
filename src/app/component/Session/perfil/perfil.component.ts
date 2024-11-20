import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PerfilRepartidorComponent } from "./perfil-repartidor/perfil-repartidor.component";
import { PerfilAdminComponent } from "./perfil-admin/perfil-admin.component";
import { PerfilClientComponent } from "./perfil-client/perfil-client.component";
import { NotFoundComponent } from "../../not-found/not-found.component";

@Component({
  selector: 'app-perfil',
  template: ` 
  @if(user.ID_ROL == 1){ <app-perfil-repartidor></app-perfil-repartidor> }
  @if(user.ID_ROL == 2){<app-perfil-admin></app-perfil-admin>}
  @if(user.ID_ROL == 3){<app-perfil-client></app-perfil-client>}
  @if(user.ID_ROL != 3 && user.ID_ROL != 2 && user.ID_ROL != 1){ <app-not-found></app-not-found>}`,
  standalone: true,
  imports: [FormsModule,PerfilRepartidorComponent, PerfilAdminComponent, PerfilClientComponent, NotFoundComponent],
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  user: any = {};
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
          this.onLogout()
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
