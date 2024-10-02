import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
private urlApiproductos = "http://localhost:3000/api/productos/"
private http: HttpClient = inject(HttpClient);
constructor() { }

  public getData(): Observable <any>{
    console.log(this.http.get<any>(this.urlApiproductos) + "hola");
    return this.http.get<any>(this.urlApiproductos)
  }

  public getDatabyID(id : number): Observable <any>{
    return this.http.get<any>(this.urlApiproductos + id)
  }

  
}
