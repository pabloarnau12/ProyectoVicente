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

export interface GetShopByIdResponse {
  tienda: Tienda;
}

export interface GetProductsByShopResponse {
  productos: Producto[];
}

export interface GetProductDetailsResponse {
  producto: Producto;
}

export interface GetMostValoratedShopsResponse {
  tiendas: Tienda[];
}

export interface GetShopByAdminResponse {
  tienda: Tienda;
}
