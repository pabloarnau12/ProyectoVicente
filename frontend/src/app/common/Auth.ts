export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    rol: number;
  };
}

export interface RegisterRequest {
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
}

export interface UserProfile {
  ID_Usuario: number;
  Nombre: string;
  Apellidos: string;
  Email: string;
  Telefono: string;
  Direccion: string;
  Rol: number;
  Estado?: string;
  Profile_Picture?: string;
}

export interface UpdateUserProfileRequest {
  Nombre: string;
  Apellidos: string;
}

export interface UpdateAddressRequest {
  direccion: string;
}

export interface UpdateStatusRequest {
  status: string;
}

export interface UpdateHorarioRequest {
  Horario_Apertura: string;
  Horario_Cierre: string;
  ID_Establecimiento: number;
}

export interface UpdateDescripcionRequest {
  Descripcion: string;
  ID_Establecimiento: number;
}
