import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromocionesService {
  private apiUrl = 'http://localhost:3300/api/promociones';
  constructor(private http: HttpClient) { }
  
  public addPromotion(promotion: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, promotion);
  }

  public deletePromotion(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  public desactivarPromotion(id: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/estado/${id}`, "estado: desactivada");
  }

  public getActivePromotions(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/active`);
  }
  public getPromotionsByShop(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/active/shop/${id}`);
  }
  
}
