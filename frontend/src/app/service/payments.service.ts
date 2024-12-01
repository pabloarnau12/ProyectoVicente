import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  private apiUrl = 'http://localhost:3300/api/payments' ;
  constructor(private http : HttpClient) { }


  processPayment(cart: any, user: any){
    return this.http.post(this.apiUrl, {cart, user});
  }
}
