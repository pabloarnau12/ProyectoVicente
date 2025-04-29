export interface FavoriteShop {
  ID_Establecimiento: number; // ID único del establecimiento
  Nombre: string; // Nombre del establecimiento
  Categoria: string; // Categoría del establecimiento
  Direccion: string; // Dirección del establecimiento
  Telefono: string; // Teléfono del establecimiento
  Horario_Apertura: string; // Hora de apertura (formato HH:mm)
  Horario_Cierre: string; // Hora de cierre (formato HH:mm)
  foto: string; // URL de la foto del establecimiento
}

export interface AddFavoriteShopRequest {
  ID_Usuario: string; // ID del usuario que agrega la tienda a favoritos
  ID_Establecimiento: string; // ID del establecimiento que se agrega a favoritos
}

export interface AddFavoriteShopResponse {
  message: string; // Mensaje de éxito o error devuelto por el backend
}

export interface RemoveFavoriteShopRequest {
  ID_Usuario: string; // ID del usuario que elimina la tienda de favoritos
  ID_Establecimiento: string; // ID del establecimiento que se elimina de favoritos
}

export interface RemoveFavoriteShopResponse {
  message: string; // Mensaje de éxito o error devuelto por el backend
}

export interface CheckFavoriteShopRequest {
  ID_Usuario: string; // ID del usuario
  ID_Establecimiento: string; // ID del establecimiento
}

export interface CheckFavoriteShopResponse {
  isFavorite: boolean; // Indica si la tienda es favorita (true o false)
}
