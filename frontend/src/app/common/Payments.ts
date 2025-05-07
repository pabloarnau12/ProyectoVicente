export interface CartItem {
  ID_Producto: number;
  Nombre: string;
  Precio: number;
  Precio_Promocion?: number | null;
  quantity: number;
  Disponibilidad: number;
}
export interface User {
  ID_Usuario: number;
  Nombre: string;
  Apellidos: string;
  Direccion: string;
}

export interface ProcessPaymentRequest {
  cart: CartItem[];
  user: User;
}

export interface ProcessPaymentResponse {
  approvalUrl: string;
}
