import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ShopService } from '../../../service/shop.service';

@Component({
  selector: 'app-bestsellers',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './bestsellers.component.html',
  styleUrl: './bestsellers.component.css',
})
export class BestsellersComponent implements OnInit {
  private readonly shopService: ShopService = inject(ShopService);
  data: any = [];
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.shopService.getMostValoratedShops(3).subscribe({
      next: (value) => {
        this.data = value;
      },
      error: (err) => {
        console.error('error al cargar las tiendas mejor valoradas');
      },
      complete: () => {
        console.log('Carga completa de tiendas mejor valoradas');
      },
    });
  }
}
