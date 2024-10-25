import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ordersService {
  private apiUrl = 'http://localhost:3306/api';

  constructor(private http: HttpClient) { }

  activeOrders(id: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/pedidos/usuario/`+6);
  }
  
}
