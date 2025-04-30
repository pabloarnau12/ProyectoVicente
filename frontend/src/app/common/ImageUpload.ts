export interface UploadProfileImageResponse {
  message: string; // Mensaje de éxito o error devuelto por el backend
  url?: string; // URL de la imagen subida (opcional)
}

export interface UploadProductImageRequest {
  image: File; // Archivo de la imagen del producto
  ID_Producto: string; // ID del producto al que pertenece la imagen
}

export interface UploadProductImageResponse {
  message: string; // Mensaje de éxito o error devuelto por el backend
  url: string; // URL de la imagen subida
}

export interface UploadShopImageRequest {
  image: File; // Archivo de la imagen del establecimiento
  ID_Establecimiento: string; // ID del establecimiento al que pertenece la imagen
}

export interface UploadShopImageResponse {
  message: string; // Mensaje de éxito o error devuelto por el backend
  url: string; // URL de la imagen subida
}
