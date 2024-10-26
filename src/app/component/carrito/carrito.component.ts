import { Component, inject } from '@angular/core';
import { CarritoService } from '../../service/carrito.service';
import { CurrencyPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CurrencyPipe, MatIcon,],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  private readonly CarritoService = inject(CarritoService);
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

  increaseQuantity(productID: number){
    console.log("sumado");
    this.CarritoService.increaseQuantity(productID);
    console.log(this.cart);
  }

  decreaseQuantity(productID: number){
    console.log("restado");
    this.CarritoService.increaseQuantity(productID);
    console.log(this.cart);

  }
}
