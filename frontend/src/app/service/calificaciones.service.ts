import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalificacionesService {
  private http: HttpClient = inject(HttpClient);
  private urlApiCalificaciones = "http://localhost:3300/api/calificaciones/"
  constructor() { }


  public getCalificacionesEstablecimientos(): Observable <any>{
    return this.http.get<any>(this.urlApiCalificaciones + '/establecimientos')
  }

  public getCalificacionesEstablecimientosbyID(id: string): Observable <any>{
    return this.http.get<any>(this.urlApiCalificaciones + '/establecimientos/'+ id);
  }

  public getCalificacionPromedioEstablecimientos(id: string): Observable<any>{
    return this.http.get<any>(this.urlApiCalificaciones + '/establecimientos/promedio/'+ id);
  }

}
