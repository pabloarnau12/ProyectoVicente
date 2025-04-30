import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CartItem,
  ProcessPaymentRequest,
  ProcessPaymentResponse,
  User,
} from '../common/Payments';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  private apiUrl = 'http://localhost:3300/api/payments';
  constructor(private http: HttpClient) {}

  processPayment(
    cart: CartItem[],
    user: User
  ): Observable<ProcessPaymentResponse> {
    const requestData: ProcessPaymentRequest = { cart, user };
    return this.http.post<ProcessPaymentResponse>(this.apiUrl, requestData);
  }
}
