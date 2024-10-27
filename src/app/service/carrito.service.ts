import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private key = 'carrito';
  private cart = signal<any[]>([]);  // Usamos una señal para el carrito

  constructor() {
    this.loadCartFromStorage(); // Carga el carrito desde localStorage al iniciar el servicio
  }

  private loadCartFromStorage() {
    const storedCart = localStorage.getItem(this.key);
    if (storedCart) {
      this.cart.set(JSON.parse(storedCart)); // Inicializa la señal desde localStorage
    }
  }

  getCart() {
    return this.cart(); // Devuelve la señal actualizada
  }

  addToCart(product: any) {
    const currentCart = this.cart();
    const existingProduct = currentCart.find((item: any) => item.ID_Producto === product.ID_Producto);
    // currentCart.push({ ...product, quantity: 1 });
    if (existingProduct) {
      existingProduct.quantity += 1;
    } 
    else {
      currentCart.push({ ...product, quantity: 1 });
    }

    this.cart.set(currentCart);  // Actualizamos el estado del carrito
    this.saveCart(currentCart);   // Guardar en localStorage
    console.log(this.cart())
    console.log(product.Nombre + " se ha añadido al carrito");
  }

  removeFromCart(productId: number) {
    let cart = this.getCart(); 
    console.log('Carrito antes de eliminar:', cart); // Para depuración

    const updatedCart = cart.filter((item: any) => item.ID_Producto !== productId);
    
    console.log('Carrito después de eliminar:', updatedCart); // Para depuración

    this.saveCart(updatedCart); 
    this.cart.set(updatedCart);  // Actualiza el estado del carrito en la señal
  }

  clearCart() {
    this.cart.set([]);  // Limpiamos el carrito
    localStorage.removeItem(this.key); // Eliminamos el carrito de localStorage
  }

  saveCart(cart: any) {
    localStorage.setItem(this.key, JSON.stringify(cart));
  }


  // increasyQuantity(product: any){
  //   const currentCart = this.cart();
  //   const newQuantity  = product.quantity + 1;
  //   console.log("Se ha aumentado la cantidad de " + product.Nombre + ": " + newQuantity);

  // }
  increaseQuantity(productId: number) {
    const currentCart = this.cart();
    const existingProduct = currentCart.find((item: any) => item.ID_Producto === productId);
    
    if (existingProduct) {
      existingProduct.quantity += 1; // Aumenta la cantidad en 1
      this.cart.set(currentCart);  // Actualiza la señal
      this.saveCart(currentCart);   // Guarda el nuevo estado en localStorage
      console.log(`Se ha aumentado la cantidad de ${existingProduct.Nombre} a ${existingProduct.quantity}`);
    } else {
      console.log("El producto no está en el carrito.");
    }
  }

  decreaseQuantity(productId: number) {
    const currentCart = this.cart();
    const existingProduct = currentCart.find((item: any) => item.ID_Producto === productId);
    
    if (existingProduct) {
      existingProduct.quantity -= 1; // Aumenta la cantidad en 1
      this.cart.set(currentCart);  // Actualiza la señal
      this.saveCart(currentCart);   // Guarda el nuevo estado en localStorage
      console.log(`Se ha disminuido la cantidad de ${existingProduct.Nombre} a ${existingProduct.quantity}`);
    } else {
      console.log("El producto no está en el carrito.");
    }
  }
}
