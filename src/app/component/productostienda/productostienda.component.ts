import { Component } from '@angular/core';
import { DataService } from '../../service/data.service';
import { Producto } from '../../common/productos';
import { NgFor, NgIf } from '@angular/common'; // Importa NgFor y NgIf
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-productostienda',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, RouterLinkActive], // Añade NgFor y NgIf a los imports
  templateUrl: './productostienda.component.html',
  styleUrls: ['./productostienda.component.css']
})
export class ProductostiendaComponent {
  

  constructor(private dataService: DataService, private router: Router, private activeRoute: ActivatedRoute) {}

  Productos!: Producto;

  ngOnInit(): void {
    this.loadProductos();

      this.activeRoute.params.subscribe(params => {
        const id = +params['id']; // El "+" convierte el parámetro a número
        if (!isNaN(id)) {
          // Obtener el producto correspondiente al índice
          this.dataService.getProductobyID2(id).subscribe(Productos => {
            this.Productos = Productos;
          });
        } else {
          console.error('ID de producto inválido');
        }
      });
  }

  loadProductos(): void {
    this.activeRoute.params.subscribe(params => {
      const id = +params['id'];
      if (!isNaN(id)) {
        this.dataService.getProductobyID2(id).subscribe({
          next: (producto: Producto) => {
            console.log(producto);

          },
          error: (err) => {
            console.log(err);
          }
        });
      } 
      else 
      {
        console.error('ID de producto inválido');
      }
    });

}
}
