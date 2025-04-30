import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AddProductoResponse,
  DeleteProductoResponse,
  GetProductoByIdResponse,
  Producto,
  UpdateProductoResponse,
} from '../common/productos';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private urlApiproductos = 'http://localhost:3300/api/productos/';
  private http: HttpClient = inject(HttpClient);
  constructor() {}
  public getData(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.urlApiproductos);
  }

  public getDatabyID(id: string): Observable<GetProductoByIdResponse> {
    return this.http.get<GetProductoByIdResponse>(this.urlApiproductos + id);
  }

  public deleteProductoById(
    ID_Producto: string,
    ID_Establecimiento: string
  ): Observable<DeleteProductoResponse> {
    return this.http.delete<DeleteProductoResponse>(
      this.urlApiproductos + ID_Producto + '/' + ID_Establecimiento
    );
  }
  public addProducto(producto: FormData): Observable<AddProductoResponse> {
    return this.http.post<AddProductoResponse>(this.urlApiproductos, producto);
  }

  public updateProducto(
    producto: Producto
  ): Observable<UpdateProductoResponse> {
    return this.http.put<UpdateProductoResponse>(
      `${this.urlApiproductos}${producto.ID_Producto}`,
      producto
    );
  }
}
