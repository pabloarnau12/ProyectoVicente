import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ordersService {
  private apiUrl = 'http://localhost:3300/api';

  constructor(private http: HttpClient) { }

  activeOrders(id: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/pedidos/usuario/`+id);
  }
  
  OrdersByState(estado : string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/pedidos/estado?estado=${encodeURIComponent(estado)}`);
  }

  getOrdersbyShop(id: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/pedidos/establecimiento/`+id);
  }

  getOrdersByShopAndState(id: string, estado: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/pedidos/establecimiento/${id}/estado?estado=${encodeURIComponent(estado)}`);
  }

}
