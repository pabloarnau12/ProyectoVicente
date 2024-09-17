import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (typeof window !== 'undefined') {
      // Estamos en el entorno del navegador
      const token = localStorage.getItem('token');
      if (token) {
        // Aquí puedes agregar lógica para verificar el token si es necesario
        return true;
      } else {
        // Redirige a la página de inicio de sesión si no hay token
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      // En el servidor, permite la navegación o maneja de otra manera
      return true;
    }
  }
}
