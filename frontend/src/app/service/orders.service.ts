import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ordersService {
  private apiUrl = 'http://localhost:3300/api';

  constructor(private http: HttpClient) { }

  OrdersByUserAndState(id: string, estado: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/pedidos/usuario/${id}?estado=${encodeURIComponent(estado)}`);
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

  acceptOrder(idPedido: number, idRepartidor: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/pedidos/${idPedido}/aceptar`, {idRepartidor});
  }

  finishOrder(idPedido: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/pedidos/${idPedido}/finalizar`, {});
  }

  getPedidoAsignado(idRepartidor : number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/pedidos/asignado/${idRepartidor}`);
  }

  updateOrderStatus(idPedido: number, nuevoEstado: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/pedidos/${idPedido}/estado`, { estado: nuevoEstado });
  }

}
