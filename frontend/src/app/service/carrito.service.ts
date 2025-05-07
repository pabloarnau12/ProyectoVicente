import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private key = 'carrito';
  private cart = signal<any[]>([]);

  constructor() {
    this.loadCartFromStorage();
  }

  private loadCartFromStorage() {
    const storedCart = localStorage.getItem(this.key);
    if (storedCart) {
      this.cart.set(JSON.parse(storedCart));
    }
  }

  getCart() {
    return this.cart();
  }

  addToCart(product: any) {
    const currentCart = this.cart();
    if (currentCart.length === 0) {
      currentCart.push({ ...product, quantity: 1 });
    } else {
      const primerProducto = currentCart[0];
      if (product.ID_Establecimiento === primerProducto.ID_Establecimiento) {
        const existingProduct = currentCart.find(
          (item: any) => item.ID_Producto === product.ID_Producto
        );
        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          currentCart.push({ ...product, quantity: 1 });
        }
      } else {
        return;
      }
    }

    this.cart.set(currentCart);
    this.saveCart(currentCart);
  }

  removeFromCart(productId: number) {
    let cart = this.getCart();

    const updatedCart = cart.filter(
      (item: any) => item.ID_Producto !== productId
    );

    this.saveCart(updatedCart);
    this.cart.set(updatedCart);
  }

  clearCart() {
    this.cart.set([]);
    localStorage.removeItem(this.key);
  }

  saveCart(cart: any) {
    localStorage.setItem(this.key, JSON.stringify(cart));
  }

  increaseQuantity(productId: number) {
    const currentCart = this.cart();
    const existingProduct = currentCart.find(
      (item: any) => item.ID_Producto === productId
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
      this.cart.set(currentCart);
      this.saveCart(currentCart);
    }
  }

  decreaseQuantity(productId: number) {
    const currentCart = this.cart();
    const existingProduct = currentCart.find(
      (item: any) => item.ID_Producto === productId
    );

    if (existingProduct) {
      existingProduct.quantity -= 1;
      this.cart.set(currentCart);
      this.saveCart(currentCart);
    }
  }
}
