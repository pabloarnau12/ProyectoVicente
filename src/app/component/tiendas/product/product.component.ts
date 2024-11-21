import { Component, inject, Input } from '@angular/core';
import { producto } from '../../../common/productos';
import { ApiService } from '../../../service/shop.service';
import { CurrencyPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { CarritoService } from '../../../service/carrito.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CurrencyPipe, MatIcon],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input({required: true}) product!:producto;

  private readonly apiService: ApiService = inject(ApiService);
  private readonly carritoService= inject(CarritoService);

  constructor(){
    
  }
  
  addToCart(product: any, event : Event) {
    event.stopPropagation();
    this.carritoService.addToCart(product); // Llama al servicio para agregar el producto
    console.log(product)
  }
  }
