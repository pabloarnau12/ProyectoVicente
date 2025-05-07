export interface FavoriteShop {
  ID_Establecimiento: number;
  Nombre: string;
  Categoria: string;
  Direccion: string;
  Telefono: string;
  Horario_Apertura: string;
  Horario_Cierre: string;
  foto: string;
}

export interface AddFavoriteShopRequest {
  ID_Usuario: string;
  ID_Establecimiento: string;
}

export interface AddFavoriteShopResponse {
  message: string;
}

export interface RemoveFavoriteShopRequest {
  ID_Usuario: string;
  ID_Establecimiento: string;
}

export interface RemoveFavoriteShopResponse {
  message: string;
}

export interface CheckFavoriteShopRequest {
  ID_Usuario: string;
  ID_Establecimiento: string;
}

export interface CheckFavoriteShopResponse {
  isFavorite: boolean;
}
