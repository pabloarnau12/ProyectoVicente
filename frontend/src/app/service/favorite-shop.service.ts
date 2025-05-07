import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AddFavoriteShopRequest,
  AddFavoriteShopResponse,
  CheckFavoriteShopRequest,
  CheckFavoriteShopResponse,
  FavoriteShop,
  RemoveFavoriteShopRequest,
  RemoveFavoriteShopResponse,
} from '../common/FavoriteShops';

@Injectable({
  providedIn: 'root',
})
export class FavoriteShopService {
  private http: HttpClient = inject(HttpClient);
  private urlApiCalificaciones = 'http://localhost:3300/api/favorite_shops/';
  constructor() {}

  public getFavoriteShops(): Observable<FavoriteShop[]> {
    return this.http.get<FavoriteShop[]>(this.urlApiCalificaciones);
  }

  public getFavoriteShopsByUser(id: string): Observable<FavoriteShop[]> {
    return this.http.get<FavoriteShop[]>(this.urlApiCalificaciones + id);
  }

  public addFavoriteShop(
    data: AddFavoriteShopRequest
  ): Observable<AddFavoriteShopResponse> {
    return this.http.post<AddFavoriteShopResponse>(
      this.urlApiCalificaciones,
      data
    );
  }

  public removeFavoriteShop(
    ID_Usuario: string,
    ID_Establecimiento: string
  ): Observable<RemoveFavoriteShopResponse> {
    const requestData: RemoveFavoriteShopRequest = {
      ID_Usuario,
      ID_Establecimiento,
    };
    return this.http.delete<RemoveFavoriteShopResponse>(
      this.urlApiCalificaciones,
      {
        body: requestData,
      }
    );
  }

  public checkFavoriteShop(
    ID_Usuario: string,
    ID_Establecimiento: string
  ): Observable<CheckFavoriteShopResponse> {
    const params = { ID_Usuario, ID_Establecimiento };
    return this.http.get<CheckFavoriteShopResponse>(
      `${this.urlApiCalificaciones}check`,
      {
        params,
        responseType: 'json',
      }
    );
  }
}
