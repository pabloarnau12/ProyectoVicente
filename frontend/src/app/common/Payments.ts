export interface CartItem {
  ID_Producto: number; // ID único del producto
  Nombre: string; // Nombre del producto
  Precio: number; // Precio del producto
  Precio_Promocion?: number | null; // Precio en promoción (opcional)
  quantity: number; // Cantidad del producto en el carrito
  Disponibilidad: number; // Disponibilidad del producto
}
export interface User {
  ID_Usuario: number; // ID único del usuario
  Nombre: string; // Nombre del usuario
  Apellidos: string; // Apellidos del usuario
  Direccion: string; // Dirección del usuario
}

export interface ProcessPaymentRequest {
  cart: CartItem[]; // Lista de productos en el carrito
  user: User; // Información del usuario
}

export interface ProcessPaymentResponse {
  approvalUrl: string; // URL de aprobación de PayPal
}
