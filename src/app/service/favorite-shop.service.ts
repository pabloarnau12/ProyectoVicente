import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteShopService {
  private http: HttpClient = inject(HttpClient);
  private urlApiCalificaciones = "http://localhost:3300/api/favorite_shops/"
  constructor() { }


  public getFavoriteShops(): Observable <any>{
    return this.http.get<any>(this.urlApiCalificaciones)
  }

  public getFavoriteShopsByUser(id: string): Observable <any>{
    return this.http.get<any>(this.urlApiCalificaciones + id);
  }
}
