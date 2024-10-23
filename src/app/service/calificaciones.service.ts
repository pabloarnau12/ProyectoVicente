import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalificacionesService {
  private http: HttpClient = inject(HttpClient);
  private urlApiCalificaciones = "http://localhost:3306/api/calificaciones/"
  constructor() { }


  public getCalificaciones(): Observable <any>{
    return this.http.get<any>(this.urlApiCalificaciones)
  }

  public getCalificacionesbyID(id: string): Observable <any>{
    return this.http.get<any>(this.urlApiCalificaciones + id);
  }

}
