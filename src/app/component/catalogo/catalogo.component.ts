import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Productos } from '../../common/productos';
import { DataService } from '../../service/data.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { PaginaProductoComponent } from '../pagina-producto/pagina-producto.component';
import { query } from 'express';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [NavbarComponent, RouterLink, RouterLinkActive],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {
  constructor(private dataService: DataService, private router: Router) { }

  Productos: Productos = { productos: [] };

  ngOnInit(): void {
    this.loadProductos();
  }
  loadProductos() {
    this.dataService.getProducto().subscribe({
      next: (data) => {
        if (data) {
          console.log(data);
          this.Productos = data;
        }
      },
      error: error => {
        console.log(error);
      },
      complete: () => {}
    });
  }
}
