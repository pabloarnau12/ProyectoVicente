import { Component, inject, Input } from '@angular/core';
import { producto } from '../../../common/productos';
import { ApiService } from '../../../service/shop.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input({required: true}) product!:producto;

  private readonly apiService: ApiService = inject(ApiService);

  constructor(){
  }

  }
