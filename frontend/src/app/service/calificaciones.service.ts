import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AddComentarioRequest,
  AddComentarioResponse,
  calificacion,
  CalificacionEstablecimiento,
  CalificacionPromedio,
} from '../common/Calificaciones';

@Injectable({
  providedIn: 'root',
})
export class CalificacionesService {
  private http: HttpClient = inject(HttpClient);
  private urlApiCalificaciones = 'http://localhost:3300/api/calificaciones/';
  constructor() {}

  public getCalificacionesEstablecimientos(): Observable<calificacion[]> {
    //devuelve todos los mensajes de calificacion
    return this.http.get<calificacion[]>(
      this.urlApiCalificaciones + '/establecimientos'
    );
  }

  public getCalificacionesEstablecimientosbyID(
    id: string
  ): Observable<CalificacionEstablecimiento[]> {
    // Devuelve los mensajes de calificación de un establecimiento en concreto
    return this.http.get<CalificacionEstablecimiento[]>(
      this.urlApiCalificaciones + '/establecimientos/' + id
    );
  }

  public getCalificacionPromedioEstablecimientos(
    id: string
  ): Observable<CalificacionPromedio> {
    return this.http.get<CalificacionPromedio>(
      this.urlApiCalificaciones + 'establecimientos/promedio/' + id
    );
  }
  public addComentarioEstablecimiento(
    ID_Usuario: number,
    Calificacion_Establecimiento: number,
    Comentario: string,
    ID_Establecimiento: number
  ): Observable<AddComentarioResponse> {
    // Crear el cuerpo de la solicitud
    const body: AddComentarioRequest = {
      ID_Usuario,
      Calificacion_Establecimiento,
      Comentario,
      ID_Establecimiento,
    };

    // Realizar la solicitud POST
    return this.http.post<AddComentarioResponse>(
      this.urlApiCalificaciones + 'establecimientos/add',
      body
    );
  }
}
