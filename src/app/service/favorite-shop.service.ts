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

  // Método para agregar una tienda a favoritos
  public addFavoriteShop(ID_Usuario: string, ID_Establecimiento: string): Observable<any> {
    return this.http.post<any>(this.urlApiCalificaciones, { ID_Usuario, ID_Establecimiento });
  }

  // Método para eliminar una tienda de favoritos
  public removeFavoriteShop(ID_Usuario: string, ID_Establecimiento: string): Observable<any> {
    return this.http.delete<any>(this.urlApiCalificaciones, { body: { ID_Usuario, ID_Establecimiento } });
  }

  checkFavoriteShop(ID_Usuario: string, ID_Establecimiento: string): Observable<any> {
    return this.http.get<any>(`${this.urlApiCalificaciones}check`, { // Asegúrate de usar comillas invertidas
        params: { ID_Usuario, ID_Establecimiento }
    });
}

  
}
