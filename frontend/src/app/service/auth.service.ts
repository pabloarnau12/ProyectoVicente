import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3300/api/auth';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  register(nombre: string, apellidos: string, email: string,telefono: string,  password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registro`, { nombre, apellidos, email, telefono, password });
  }

  getProfile(token: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/perfil`, { headers: { Authorization: `Bearer ${token}` } });
  }

  logout(): void {
    localStorage.removeItem('token');
    console.log('Sesión cerrada correctamente');
    
  }

  updateAddress(direccion: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.patch<any>(`${this.apiUrl}/perfil/direccion`, { direccion }, { headers });
  }

  updateStatus(status: string, token: string): Observable<any>{
    const headers = { Authorization: `Bearer ${token}` };
    // return this.http.patch('/perfil/status', { status }, { headers });
    return this.http.patch<any>(`${this.apiUrl}/perfil/status`, { status }, { headers });
  }
  
}
