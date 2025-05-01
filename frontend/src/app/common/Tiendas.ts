export interface Tienda {
  ID_Establecimiento: number;
  Nombre: string;
  Categoria: string;
  Direccion: string;
  Telefono: string;
  Horario_Apertura: Date;
  Horario_Cierre: Date;
  Calificacion_Promedio: number;
  foto: string;
}
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

export interface GetShopByIdResponse {
  tienda: Tienda; // Tienda específica
}

export interface GetProductsByShopResponse {
  productos: Producto[]; // Lista de productos de la tienda
}

export interface GetProductDetailsResponse {
  producto: Producto; // Detalles del producto
}

export interface GetMostValoratedShopsResponse {
  tiendas: Tienda[]; // Lista de tiendas mejor valoradas
}

export interface GetShopByAdminResponse {
  tienda: Tienda; // Tienda asociada al administrador
}
