import { Component } from '@angular/core';

import { Producto } from '../../../common/productos';
import { NgFor, NgIf } from '@angular/common'; // Importa NgFor y NgIf
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService } from '../../../service/shop.service';

@Component({
  selector: 'app-productostienda',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, RouterLinkActive], // Añade NgFor y NgIf a los imports
  templateUrl: './productostienda.component.html',
  styleUrls: ['./productostienda.component.css']
})
export class ProductostiendaComponent {
  
  nombre: string | null = null;

  data : any = [];
  constructor(private router: Router, private activeRoute: ActivatedRoute, private apiService : ApiService, private route : ActivatedRoute) {}

  Productos!: Producto;

  ngOnInit(): void {


          // Obtener el parámetro de la URL y convertirlo a número
          const nombreParam = this.activeRoute.snapshot.paramMap.get('nombre'); 
          this.nombre = nombreParam !== null ? nombreParam : null;

    console.log(this.nombre); // Muestra el ID como número, por ejemplo, 42
      this.llenardatabyID();
      
  }



llenardatabyID() {
  if (this.nombre !== null) {
    this.apiService.getProductsByShop(this.nombre).subscribe(data => {
      this.data = data;
      console.log(this.data);
    });
  } else {
    console.error('productoId es null, no se puede hacer la petición.');
  }
}
}
