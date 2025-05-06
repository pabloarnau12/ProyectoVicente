import { Component, inject } from '@angular/core';
import { CarritoService } from '../../service/carrito.service';
import { CurrencyPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { PaymentsService } from '../../service/payments.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [MatIcon, RouterLink],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css',
})
export class CarritoComponent {
  private readonly CarritoService = inject(CarritoService);
  private readonly paymentService = inject(PaymentsService);

  constructor(private router: Router) {}
  cart: any[] = [];

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cart = this.CarritoService.getCart();
  }

  removeFromCart(productId: number): void {
    this.CarritoService.removeFromCart(productId);
    this.loadCart();
  }

  clearCart(): void {
    this.CarritoService.clearCart();
    this.loadCart();
  }
  openCart(): void {
    const sidebar = document.getElementById('cartSidebar');
    if (sidebar) {
      sidebar.classList.add('open');
    }
  }

  closeCart(): void {
    const sidebar = document.getElementById('cartSidebar');
    if (sidebar) {
      sidebar.classList.remove('open');
    }
  }

  increaseQuantity(productId: number): void {
    const product = this.cart.find((item) => item.ID_Producto === productId);
    if (product) {
      product.quantity += 1;
    }
    this.updateCart();
  }

  decreaseQuantity(productId: number): void {
    const product = this.cart.find((item) => item.ID_Producto === productId);
    if (product && product.quantity > 1) {
      product.quantity -= 1;
    }
    this.updateCart();
  }

  updateCart(): void {
    this.cart = this.cart.map((item) => ({
      ...item,
      subtotal:
        (item.Precio_Promocion !== null ? item.Precio_Promocion : item.Precio) *
        item.quantity,
    }));
    localStorage.setItem('cart', JSON.stringify(this.cart));
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
}
