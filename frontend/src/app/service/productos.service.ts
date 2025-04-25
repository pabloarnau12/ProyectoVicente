import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
private urlApiproductos = "http://localhost:3300/api/productos/"
private http: HttpClient = inject(HttpClient);
constructor() { }

  public getData(): Observable <any>{
    console.log(this.http.get<any>(this.urlApiproductos));
    return this.http.get<any>(this.urlApiproductos)
  }

  public getDatabyID(id : string): Observable <any>{
    return this.http.get<any>(this.urlApiproductos + id)
  }

  public deleteProductoById(ID_Producto : string, ID_Establecimiento : string): Observable <any>{
    return this.http.delete<any>(this.urlApiproductos + ID_Producto + "/" + ID_Establecimiento)
  }

  public addProducto(producto: FormData): Observable<any> {
    return this.http.post<any>(this.urlApiproductos, producto);
  }
  
  updateProducto(producto: any): Observable<any> {
    return this.http.put(`${this.urlApiproductos}${producto.ID_Producto}`, producto);
  }
}
