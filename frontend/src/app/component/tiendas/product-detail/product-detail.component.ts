import { Component, inject, Input } from '@angular/core';
import { ApiService } from '../../../service/shop.service';
import { producto } from '../../../common/productos';
import { ProductosService } from '../../../service/productos.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  @Input('id') id!: string;
  @Input('idProducto') idProducto!: string;
  constructor(private activeRoute: ActivatedRoute) {}
  private readonly apiService: ApiService = inject(ApiService);
  private readonly ProductosService: ProductosService = inject(ProductosService);
  
  product !: producto;


  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.id = params['id'];
    });
    this.activeRoute.params.subscribe(params => {
      this.idProducto = params['idProducto'];
    });
    this.loadProducts();
    
  }
  

  private loadProducts() : void {
    this.apiService.getProductsDetails(this.id, this.idProducto ).subscribe(
      {
      next: value => {this.product = value;
      console.log(this.product);
      },
      error: err => console.error,
      complete : () => console.log("carga de productos completa") 
    }
    )
}
}
