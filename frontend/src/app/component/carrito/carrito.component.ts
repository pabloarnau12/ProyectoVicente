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
    this.loadCart(); // Cargar el carrito al iniciar
  }

  // Método para cargar el carrito desde el servicio
  loadCart(): void {
    this.cart = this.CarritoService.getCart(); // Obtener el carrito
  }

  // Método para eliminar un producto del carrito
  removeFromCart(productId: number): void {
    this.CarritoService.removeFromCart(productId); // Llamar al método del servicio
    this.loadCart(); // Recargar el carrito después de eliminar
    console.log(this.cart);
  }

  // Método para limpiar el carrito
  clearCart(): void {
    this.CarritoService.clearCart();
    this.loadCart(); // Recargar el carrito después de limpiar
    console.log(this.cart);
  }
  openCart(): void {
    const sidebar = document.getElementById('cartSidebar');
    if (sidebar) {
      sidebar.classList.add('open'); // Añade la clase 'open' para abrir el carrito
    }
  }

  // Cerrar el carrito (sidebar)
  closeCart(): void {
    const sidebar = document.getElementById('cartSidebar');
    if (sidebar) {
      sidebar.classList.remove('open'); // Elimina la clase 'open' para cerrar el carrito
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
