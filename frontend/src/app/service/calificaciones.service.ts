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
    //devuelve todos los mensajes de calificacion
    return this.http.get<any>(this.urlApiCalificaciones + '/establecimientos')
  }

  public getCalificacionesEstablecimientosbyID(id: string): Observable <any>{
    //devuelve los mensajes de calificacion de una tienda en concreto
    return this.http.get<any>(this.urlApiCalificaciones + '/establecimientos/'+ id);
  }

  public getCalificacionPromedioEstablecimientos(id: string): Observable<any>{
    //devuelve la media de puntuacion de una tienda
    return this.http.get<any>(this.urlApiCalificaciones + '/establecimientos/promedio/'+ id);
  }
  public addComentarioEstablecimiento(ID_Usuario: number, Calificacion_Establecimiento: number, Comentario: string, ID_Establecimiento: number): Observable<any>{
    //post para añadir un comentario
    const body = {ID_Usuario,Calificacion_Establecimiento,Comentario,ID_Establecimiento};
    return this.http.post<any>(this.urlApiCalificaciones + 'establecimientos/add', {body})
  }
}
