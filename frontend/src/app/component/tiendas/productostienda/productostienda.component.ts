import { Component, inject, Input } from '@angular/core';

import { NgFor, NgIf } from '@angular/common';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { ShopService } from '../../../service/shop.service';
import { ProductComponent } from '../product/product.component';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../../common/productos';

@Component({
  selector: 'app-productostienda',
  standalone: true,
  imports: [RouterLink, ProductComponent, FormsModule],
  templateUrl: './productostienda.component.html',
  styleUrls: ['./productostienda.component.css'],
})
export class ProductostiendaComponent {
  private readonly ShopService: ShopService = inject(ShopService);
  data: Producto[] = [];
  private id!: string;
  constructor(private activeRoute: ActivatedRoute) {}

  filteredData: Producto[] = [];
  tiposUnicos: string[] = [];
  searchTerm: string = '';

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.llenardatabyID();
  }

  filterData(): void {
    if (this.searchTerm) {
      this.filteredData = this.data.filter((item) =>
        item.Nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredData = this.data;
    }
  }

  llenardatabyID(): void {
    this.ShopService.getProductsByShop(this.id).subscribe({
      next: (value) => {
        this.data = value;
      },
      error: (err) => console.error,
      complete: () => console.log('carga de productos completa'),
    });
  }
}
