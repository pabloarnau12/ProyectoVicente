import { Component, inject, OnInit } from '@angular/core';
import { CarritoService } from '../../service/carrito.service';
import { FormsModule } from '@angular/forms';
import { PaymentsService } from '../../service/payments.service';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-tramitar-pagos',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './tramitar-pagos.component.html',
  styleUrl: './tramitar-pagos.component.css'
})
export class TramitarPagosComponent implements OnInit{
  errorMessage: string = '';
  paymentMethod: string = '';
  private readonly CarritoService: CarritoService = inject(CarritoService);
  private readonly paymentService: PaymentsService = inject(PaymentsService);

  cart: any[] = []
  constructor(private router: Router){

  }

  ngOnInit(): void {
    this.loadCart();
  }


  loadCart(): void {
    this.cart = this.CarritoService.getCart(); // Obtener el carrito
  }

  getTotal(): string {
    return this.cart
      .reduce((total, item) => total + item.Precio * item.quantity, 0).toFixed(2);
  }

  proceedToPayment() {
    const token = localStorage.getItem('token');
    if (token) {
      this.paymentService.processPayment(this.cart).subscribe({
        next: (response: any) => {
          window.location.href = response.approvalUrl; // Redirige al usuario al URL de PayPal
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Error desconocido. Intenta nuevamente.'; // Maneja el error
        }
      });
    } else {
      this.router.navigate(['/iniciarsesion']); // Redirige al login si no hay token
    }
  }
  

}

