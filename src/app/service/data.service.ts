import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Productos } from '../common/productos';
import { ProductoUnico } from '../common/producto-unico';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient){}

  getProducto(): Observable<Productos>{
    return this.http.get<Productos>('../assets/json/productos.json')
  }

  public getProductobyID(id: number): Observable<ProductoUnico> {
    return this.http.get<Productos>('../assets/json/productos.json').pipe(
      map((productos: Productos) => {
        if (id >= 0 && id < productos.productos.length+1) {
          return productos.productos[id - 1];
        } else {
          throw new Error('ID de producto fuera de rango');
        }
      })
    );
  }


}


