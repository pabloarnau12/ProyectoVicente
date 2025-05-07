export interface calificacion {
  Calificacion_Establecimiento: number;
  Comentario: string;
  Fecha_Calificacion: string;
  ID_Calificacion: number;
  ID_establecimiento: number;
  ID_Usuario: number;
  Usuario_Foto: string;
  Usuario_Nombre: string;
}

export interface CalificacionPromedio {
  media_calificacion: string;
}

export interface CalificacionEstablecimiento {
  ID_Calificacion: number;
  ID_Establecimiento: number;
  ID_Usuario: number;
  Calificacion_Establecimiento: number;
  Comentario: string;
  Fecha_Calificacion: string;
  Usuario_Nombre: string;
  Usuario_Foto: string;
}

export interface AddComentarioRequest {
  ID_Usuario: number;
  Calificacion_Establecimiento: number;
  Comentario: string;
  ID_Establecimiento: number;
}

export interface AddComentarioResponse {
  message: string;
}
