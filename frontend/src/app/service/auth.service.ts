import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  UpdateAddressRequest,
  UpdateDescripcionRequest,
  UpdateHorarioRequest,
  UpdateStatusRequest,
  UpdateUserProfileRequest,
  UserProfile,
} from '../common/Auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3300/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    const body: LoginRequest = { email, password };
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, body);
  }

  register(data: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/registro`, data);
  }

  getProfile(token: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/perfil`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  logout(): void {
    localStorage.removeItem('token');
  }
  updateUserProfile(
    user: UpdateUserProfileRequest,
    token: string
  ): Observable<{ message: string }> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.patch<{ message: string }>(`${this.apiUrl}/perfil`, user, {
      headers,
    });
  }

  updateAddress(
    data: UpdateAddressRequest,
    token: string
  ): Observable<{ message: string }> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.patch<{ message: string }>(
      `${this.apiUrl}/perfil/direccion`,
      data,
      { headers }
    );
  }

  updateStatus(
    data: UpdateStatusRequest,
    token: string
  ): Observable<{ message: string }> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.patch<{ message: string }>(
      `${this.apiUrl}/perfil/status`,
      data,
      { headers }
    );
  }

  updateHorario(
    data: UpdateHorarioRequest,
    token: string
  ): Observable<{ message: string }> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.patch<{ message: string }>(
      `${this.apiUrl}/perfil/horario`,
      data,
      { headers }
    );
  }

  updateDescription(
    data: UpdateDescripcionRequest,
    token: string
  ): Observable<{ message: string }> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.patch<{ message: string }>(
      `${this.apiUrl}/perfil/descripcion`,
      data,
      { headers }
    );
  }
}
