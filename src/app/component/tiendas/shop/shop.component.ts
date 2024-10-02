import { Component, Input } from '@angular/core';
import { Tiendas } from '../../../common/Tiendas';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  @Input({required: true}) tienda!:Tiendas;
}
