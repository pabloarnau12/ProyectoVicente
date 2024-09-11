import { Component } from '@angular/core';
import { Productos } from '../../common/productos';
import { DataService } from '../../service/data.service';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common'; // Importa NgFor y NgIf

@Component({
  selector: 'app-productostienda',
  standalone: true,
  imports: [NgFor, NgIf], // Añade NgFor y NgIf a los imports
  templateUrl: './productostienda.component.html',
  styleUrls: ['./productostienda.component.css']
})
export class ProductostiendaComponent {
  Productos: Productos = { productos: [] };

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.loadProductos();
  }

  loadProductos(): void {
    this.dataService.getProducto().subscribe({
      next: (data: Productos) => {
        this.Productos = data;
      },
      error: (error) => {
        console.error('Error al cargar productos', error);
      }
    });
  }
}
