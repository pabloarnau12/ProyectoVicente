import { Component, inject, OnInit } from '@angular/core';
import { CarritoService } from '../../service/carrito.service';
import { FormsModule } from '@angular/forms';
import { PaymentsService } from '../../service/payments.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';


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


  user: any[] = []
  cart: any[] = []
  constructor(private router: Router, private authService: AuthService){

  }

  ngOnInit(): void {
    this.loadCart();
    this.loadProfile();
  }

  loadProfile(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.getProfile(token).subscribe(
        (profile) => {
          this.user = profile;
          console.log('Perfil cargado:', this.user); // Para depuración
        },
        (error) => {
          console.error('Error al cargar el perfil', error);
        }
      );
    } else {
      console.error('No se encontró el token');
    }
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
      this.paymentService.processPayment(this.cart, this.user).subscribe({
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

