import { Component, inject, OnInit } from '@angular/core';
import { CarritoService } from '../../service/carrito.service';
import { FormsModule } from '@angular/forms';
import { PaymentsService } from '../../service/payments.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tramitar-pagos',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './tramitar-pagos.component.html',
  styleUrl: './tramitar-pagos.component.css',
})
export class TramitarPagosComponent implements OnInit {
  errorMessage: string = '';
  paymentMethod: string = '';
  private readonly CarritoService: CarritoService = inject(CarritoService);
  private readonly paymentService: PaymentsService = inject(PaymentsService);

  user: any = {};
  cart: any[] = [];
  constructor(private router: Router, private authService: AuthService) {}

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
        },
        (error) => {
          this.router.navigate(['/login']);
        }
      );
    } else {
      this.router.navigate(['/login']);
    }
  }
  loadCart(): void {
    this.cart = this.CarritoService.getCart();
  }

  getTotal(): string {
    return this.cart
      .reduce((total, item) => {
        const price =
          item.Precio_Promocion !== null ? item.Precio_Promocion : item.Precio;
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  }
  proceedToPayment() {
    const unavailableProduct = this.cart.find(
      (item) => item.quantity > item.Disponibilidad
    );

    if (unavailableProduct) {
      Swal.fire({
        icon: 'error',
        title: 'Cantidad no disponible',
        text: `El producto "${unavailableProduct.Nombre}" tiene una disponibilidad de ${unavailableProduct.Disponibilidad}, pero has añadido ${unavailableProduct.quantity} al carrito.`,
      });
      return;
    }

    const cartForPayment = this.cart.map((item) => ({
      ...item,
      Precio:
        item.Precio_Promocion !== null ? item.Precio_Promocion : item.Precio,
    }));

    const token = localStorage.getItem('token');
    if (token) {
      this.paymentService.processPayment(cartForPayment, this.user).subscribe({
        next: (response: any) => {
          window.location.href = response.approvalUrl;
          this.CarritoService.clearCart();
        },
        error: (err) => {
          this.errorMessage =
            err.error?.message || 'Error desconocido. Intenta nuevamente.';
        },
      });
    } else {
      this.router.navigate(['/iniciarsesion']);
    }
  }
  async tryfuncion() {
    const { value: address } = await Swal.fire({
      title: 'Introduce tu nueva dirección',
      input: 'text',
      inputLabel: 'Nueva dirección',
      inputValue: '',
      showCancelButton: true,
    });

    if (address) {
      Swal.fire(`Tu nueva dirección es ${address}`);
      const token = localStorage.getItem('token');

      if (token) {
        const addressData = { direccion: address };
        this.authService.updateAddress(addressData, token).subscribe(
          (response) => {
            Swal.fire(response.message);
            this.loadProfile();
          },
          (error) => {
            console.error('Error al actualizar la dirección:', error);
            Swal.fire('Error al actualizar la dirección');
          }
        );
      }
    }
  }
}
