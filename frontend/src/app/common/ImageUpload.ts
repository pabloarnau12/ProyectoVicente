export interface UploadProfileImageResponse {
  message: string;
  url?: string;
}

export interface UploadProductImageRequest {
  image: File;
  ID_Producto: string;
}

export interface UploadProductImageResponse {
  message: string;
  url: string;
}

export interface UploadShopImageRequest {
  image: File;
  ID_Establecimiento: string;
}

export interface UploadShopImageResponse {
  message: string;
  url: string;
}
