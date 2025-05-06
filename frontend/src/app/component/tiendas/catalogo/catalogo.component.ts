import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShopService } from '../../../service/shop.service';
import { Tienda } from '../../../common/Tiendas';
import { ShopComponent } from '../shop/shop.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CategoriasService } from '../../../service/categorias.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [RouterLink, ShopComponent, FormsModule, MatIconModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css',
})
export class CatalogoComponent {
  private readonly ShopService: ShopService = inject(ShopService);
  private readonly categoriasService: CategoriasService =
    inject(CategoriasService);

  constructor() {}
  data: Tienda[] = [];
  categorias: any;
  categoriasSelected: any;

  filteredData: Tienda[] = [];
  tiposUnicos: string[] = [];
  searchTerm: string = '';

  ngOnInit(): void {
    this.llenardata();

    this.loadCategorias();
  }

  llenardata(): void {
    this.ShopService.getShops().subscribe({
      next: (response) => {
        this.data = response;
        this.filteredData = this.data;
      },
      error: (err) => {
        console.error('Error al cargar las tiendas:', err);
        alert('Hubo un error al cargar las tiendas. Intenta nuevamente.');
      },
    });
  }
  filterDatabyName(): void {
    if (this.searchTerm) {
      this.filteredData = this.data.filter((item) =>
        item.Nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredData = this.data;
    }
  }

  filterDatabyCategory(): void {
    if (this.categoriasSelected) {
      this.filteredData = this.data.filter(
        (item) =>
          item.Categoria && item.Categoria.includes(this.categoriasSelected)
      );
    } else {
      this.filteredData = this.data;
    }
  }

  loadCategorias(): void {
    this.categoriasService
      .getCategoriasEstablecimientos()
      .subscribe((categorias) => {
        this.categorias = categorias;
      });
  }
}
