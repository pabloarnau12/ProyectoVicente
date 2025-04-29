export interface LoginRequest {
  email: string; // Correo electrónico del usuario
  password: string; // Contraseña del usuario
}

export interface LoginResponse {
  token: string; // Token JWT devuelto por el servidor
  user: {
    id: number; // ID del usuario
    email: string; // Correo electrónico del usuario
    rol: number; // Rol del usuario (por ejemplo, administrador, cliente, etc.)
  };
}

export interface RegisterRequest {
  nombre: string; // Nombre del usuario
  apellidos: string; // Apellidos del usuario
  email: string; // Correo electrónico del usuario
  telefono: string; // Teléfono del usuario
  password: string; // Contraseña del usuario
}

export interface RegisterResponse {
  message: string; // Mensaje de éxito o error del servidor
}

export interface UserProfile {
  ID_Usuario: number; // ID único del usuario
  Nombre: string; // Nombre del usuario
  Apellidos: string; // Apellidos del usuario
  Email: string; // Correo electrónico del usuario
  Telefono: string; // Teléfono del usuario
  Direccion: string; // Dirección del usuario
  Rol: number; // Rol del usuario (por ejemplo, cliente, administrador)
  Estado?: string; // Estado del usuario (opcional)
  Profile_Picture?: string; // URL de la foto de perfil (opcional)
}

export interface UpdateUserProfileRequest {
  Nombre: string; // Nombre del usuario
  Apellidos: string; // Apellidos del usuario
}

export interface UpdateAddressRequest {
  direccion: string;
}

export interface UpdateStatusRequest {
  status: string; // Estado del usuario (por ejemplo, "activo", "ocupado", etc.)
}

export interface UpdateHorarioRequest {
  Horario_Apertura: string; // Hora de apertura del establecimiento (formato HH:mm)
  Horario_Cierre: string; // Hora de cierre del establecimiento (formato HH:mm)
  ID_Establecimiento: number; // ID único del establecimiento
}

export interface UpdateDescripcionRequest {
  Descripcion: string; // Nueva descripción del establecimiento
  ID_Establecimiento: number; // ID único del establecimiento
}
