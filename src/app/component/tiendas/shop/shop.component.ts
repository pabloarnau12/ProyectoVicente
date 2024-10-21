import { Component, Input } from '@angular/core';
import { Tiendas } from '../../../common/Tiendas';
import { NgStyle } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [NgStyle, MatIcon],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  @Input({required: true}) tienda!:Tiendas;
}
