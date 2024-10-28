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
    if (currentCart.length === 0) {
        // Si el carrito está vacío, añadimos el producto directamente
        currentCart.push({ ...product, quantity: 1 });
    } else {
        const primerProducto = currentCart[0];
        if (product.ID_Establecimiento === primerProducto.ID_Establecimiento) {
            // El producto es del mismo establecimiento
            const existingProduct = currentCart.find((item: any) => item.ID_Producto === product.ID_Producto);
            if (existingProduct) {
                // Si el producto ya está en el carrito, aumentamos la cantidad
                existingProduct.quantity += 1;
            } else {
                // Si es un nuevo producto del mismo establecimiento, lo añadimos
                currentCart.push({ ...product, quantity: 1});

            }
        } else {
            // El producto es de un establecimiento diferente
            console.log("Los pedidos deben ser de un mismo establecimiento");
            return; // Salimos de la función sin añadir el producto
        }
    }

    this.cart.set(currentCart);  // Actualizamos el estado del carrito
    this.saveCart(currentCart);   // Guardar en localStorage
    console.log(this.cart());
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
