import { Component, inject, Input } from '@angular/core';
import { producto } from '../../../common/productos';
import { ApiService } from '../../../service/shop.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input({required: true}) product!:producto;

  private readonly apiService: ApiService = inject(ApiService);

  constructor(){
  }

  }
