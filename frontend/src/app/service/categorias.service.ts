import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private http: HttpClient = inject(HttpClient);
  private urlApiCategorias = "http://localhost:3300/api/categorias/"
  constructor() { }

  public getCategoriasEstablecimientos(){
    return this.http.get<any>(this.urlApiCategorias+'establecimientos');
  }
}
