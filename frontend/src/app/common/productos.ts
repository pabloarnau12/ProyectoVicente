export interface Producto {
  ID_Producto: number; // ID único del producto
  ID_Establecimiento: number; // ID del establecimiento al que pertenece el producto
  Nombre: string; // Nombre del producto
  Descripcion: string; // Descripción del producto
  Precio: number; // Precio del producto
  Disponibilidad: number; // Disponibilidad del producto
  Foto: string; // URL de la imagen del producto
  Tipo: string; // Tipo o categoría del producto
  Precio_Promocion?: number | null; // Precio en promoción (opcional)
}

export interface GetProductoByIdResponse {
  producto: Producto; // Producto devuelto por el backend
}
export interface DeleteProductoResponse {
  affectedRows: number; // Número de filas afectadas por la operación
  message?: string; // Mensaje opcional del backend
}
export interface AddProductoResponse {
  message: string; // Mensaje de éxito o error
  productoID: number; // ID del producto creado
}

export interface UpdateProductoResponse {
  message: string; // Mensaje de éxito o error
}
