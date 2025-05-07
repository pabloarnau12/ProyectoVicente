export interface Producto {
  ID_Producto: number;
  ID_Establecimiento: number;
  Nombre: string;
  Descripcion: string;
  Precio: number;
  Disponibilidad: number;
  Foto: string;
  Tipo: string;
  Precio_Promocion?: number | null;
}

export interface GetProductoByIdResponse {
  producto: Producto;
}
export interface DeleteProductoResponse {
  affectedRows: number;
  message?: string;
}
export interface AddProductoResponse {
  message: string;
  productoID: number;
}

export interface UpdateProductoResponse {
  message: string;
}
