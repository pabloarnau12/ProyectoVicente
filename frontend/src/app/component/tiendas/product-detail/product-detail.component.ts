import { Component, inject, Input } from '@angular/core';
import { ShopService } from '../../../service/shop.service';
import { Producto } from '../../../common/productos';
import { ProductosService } from '../../../service/productos.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CarritoService } from '../../../service/carrito.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  @Input('id') id!: string;
  @Input('idProducto') idProducto!: string;
  constructor(private activeRoute: ActivatedRoute) {}
  private readonly ShopService: ShopService = inject(ShopService);
  private readonly ProductosService: ProductosService =
    inject(ProductosService);
  private readonly carritoService: CarritoService = inject(CarritoService);
  product!: Producto;

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.idProducto = params['idProducto'];
    });
    this.loadProducts();
  }

  private loadProducts(): void {
    this.ShopService.getProductsDetails(this.id, this.idProducto).subscribe({
      next: (value) => {
        this.product = value;
        console.log(this.product);
      },
      error: (err) => console.error('Error al cargar el producto:', err),
      complete: () => console.log('Carga de producto completa'),
    });
  }

  addToCart(): void {
    this.carritoService.addToCart(this.product);
    console.log('Producto añadido al carrito:', this.product);
  }
}
