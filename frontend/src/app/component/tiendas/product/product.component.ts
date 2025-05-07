import { Component, inject, Input } from '@angular/core';

import { ShopService } from '../../../service/shop.service';
import { CurrencyPipe, NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { CarritoService } from '../../../service/carrito.service';
import { Producto } from '../../../common/productos';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CurrencyPipe, MatIcon, NgClass],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  @Input({ required: true }) product!: Producto;

  private readonly ShopService: ShopService = inject(ShopService);
  private readonly carritoService = inject(CarritoService);

  constructor() {}

  addToCart(product: any, event: Event) {
    event.stopPropagation();
    this.carritoService.addToCart(product);
  }
}
