import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private urlApiproductos = "http://localhost:3000/api/productos/"
  private urlApiTiendas = "http://localhost:3000/api/tiendas/"

  public getData(): Observable <any>{
    return this.http.get<any>(this.urlApiproductos)
  }

  public getDatabyID(id : number): Observable <any>{
    return this.http.get<any>(this.urlApiproductos + id)
  }

  public getShops(): Observable <any>{
    return this.http.get<any>(this.urlApiTiendas)
  }

  public getShopsbyID(nombre : string): Observable <any>{
    return this.http.get<any>(this.urlApiTiendas + nombre)
  }

  public getProductsByShop(nombre : string): Observable <any>{
    return this.http.get<any>(this.urlApiTiendas + nombre + '/productos')
  }

}
