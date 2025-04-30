export interface AcceptOrderRequest {
  idRepartidor: number; // ID del repartidor que acepta el pedido
}

export interface AcceptOrderResponse {
  message: string; // Mensaje de éxito o error
}

export interface FinishOrderResponse {
  message: string; // Mensaje de éxito o error
}

export interface UpdateOrderStatusRequest {
  Estado: string; // Nuevo estado del pedido
}

export interface UpdateOrderStatusResponse {
  message: string; // Mensaje de éxito o error
}
