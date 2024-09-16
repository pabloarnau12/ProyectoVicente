import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductoUnico } from '../../common/producto-unico';
import { DataService } from '../../service/data.service';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-pagina-producto',
  standalone: true,
  imports: [NavbarComponent, RouterLink, RouterLinkActive],
  templateUrl: './pagina-producto.component.html',
  styleUrl: './pagina-producto.component.css'
})
export class PaginaProductoComponent {

  constructor(
    private dataService: DataService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private apiService : ApiService) { }

  Productos!: ProductoUnico;
  data : any = [];
  id: number | null = null;

  ngOnInit(): void {
    // this.loadProductos();
    const idParam = this.activeRoute.snapshot.paramMap.get('id');
    this.id = idParam !== null ? Number(idParam) : null;
    this.llenardatabyID();
      // this.activeRoute.params.subscribe(params => {
      //   const id = +params['id']; // El "+" convierte el parámetro a número
      //   if (!isNaN(id)) {
      //     // Obtener el producto correspondiente al índice
      //     this.dataService.getProductobyID(id).subscribe(Productos => {
      //       this.Productos = Productos;
      //     });
      //   } else {
      //     console.error('ID de producto inválido');
      //   }
      // });
  }

//   loadProductos(): void {
//     this.activeRoute.params.subscribe(params => {
//       const id = +params['id'];
//       if (!isNaN(id)) {
//         this.dataService.getProductobyID(id).subscribe({
//           next: (producto: ProductoUnico) => {
//             console.log(producto);

//           },
//           error: (err) => {
//             console.log(err);
//           }
//         });
//       } 
//       else 
//       {
//         console.error('ID de producto inválido');
//       }
//     });

// }

llenardatabyID() {
  if (this.id !== null) {
    this.apiService.getShopsbyID(this.id).subscribe(data => {
      this.data = data;
      console.log(this.data);
    });
  } else {
    console.error('productoId es null, no se puede hacer la petición.');
  }
}
}
