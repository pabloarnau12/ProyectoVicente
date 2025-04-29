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
  media_calificacion: string; // Promedio de calificaciones en formato string
}

export interface CalificacionEstablecimiento {
  ID_Calificacion: number; // ID único de la calificación
  ID_Establecimiento: number; // ID del establecimiento
  ID_Usuario: number; // ID del usuario que realizó la calificación
  Calificacion_Establecimiento: number; // Puntuación dada al establecimiento
  Comentario: string; // Comentario del usuario
  Fecha_Calificacion: string; // Fecha en la que se realizó la calificación
  Usuario_Nombre: string; // Nombre del usuario que realizó la calificación
  Usuario_Foto: string; // Foto de perfil del usuario
}

export interface AddComentarioRequest {
  ID_Usuario: number;
  Calificacion_Establecimiento: number;
  Comentario: string;
  ID_Establecimiento: number;
}

export interface AddComentarioResponse {
  message: string; // Mensaje de éxito o error
}
