export interface AcceptOrderRequest {
  idRepartidor: number;
}

export interface AcceptOrderResponse {
  message: string;
}

export interface FinishOrderResponse {
  message: string;
}

export interface UpdateOrderStatusRequest {
  Estado: string;
}

export interface UpdateOrderStatusResponse {
  message: string;
}
