import { inject } from '@angular/core';
import { Router } from '@angular/router';

// Nueva función de guard para Angular 17
export const authGuard = (): boolean => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    return true; // Permitir acceso si hay token
  } else {
    router.navigate(['/iniciarsesion']); // Redirigir a login si no hay token
    return false; // Bloquear acceso
  }
};
