import { inject } from '@angular/core';
import { Router } from '@angular/router';

// Nueva función de guard para Angular 17
export const authGuard = (): boolean => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    console.log("Token encontrado:", token);
    return true;  // Permitir acceso si hay token
  } else {
    console.log("Token no encontrado. Redirigiendo a la página de inicio de sesión...");
    router.navigate(['/iniciarsesion']);  // Redirigir a login si no hay token
    return false;  // Bloquear acceso
  }
};
