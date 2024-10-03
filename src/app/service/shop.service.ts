import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http: HttpClient = inject(HttpClient);
  private urlApiTiendas = "http://localhost:3000/api/tiendas/"
  constructor() { }


  public getShops(): Observable <any>{
    return this.http.get<any>(this.urlApiTiendas)
  }

  public getShopsbyID(id : string): Observable <any>{
    return this.http.get<any>(this.urlApiTiendas + id)
  }

  public getProductsByShop(id : string): Observable <any>{
    return this.http.get<any>(this.urlApiTiendas + id + '/productos')
  }
  
  public getProductsDetails(id : string, idProducto : string): Observable <any>{
    return this.http.get<any>(this.urlApiTiendas + id + '/productos/' + idProducto)
  }
}
