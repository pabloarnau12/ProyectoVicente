import { Component } from '@angular/core';
import { DataService } from '../../../service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoUnico } from '../../../common/producto-unico';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-paginapago',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './paginapago.component.html',
  styleUrl: './paginapago.component.css'
})
export class PaginapagoComponent {



  constructor(
    private dataService: DataService,
    private activeRoute: ActivatedRoute,
    private router: Router) { }

  ;
  

  Productos!: ProductoUnico
  cantidad: number = 1; // Inicializa la cantidad con 1

  ngOnInit(): void {
    this.loadProductos();

      this.activeRoute.params.subscribe(params => {
        const id = +params['id']; // El "+" convierte el parámetro a número
        if (!isNaN(id)) {
          // Obtener el producto correspondiente al índice
          this.dataService.getProductobyID(id).subscribe(Productos => {
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
        this.dataService.getProductobyID(id).subscribe({
          next: (producto: ProductoUnico) => {
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


NombreDescuento = 'berthaApruebanos';
estadodescuento = false;
Envio = 5;
PorcentajeDescuento = 10;

applyDiscount(valor : string){

  if (valor == this.NombreDescuento){
    console.log(this.Productos.precio);
    this.estadodescuento = true;
  }else{
    console.log('El codigo no es correcto')
    this.estadodescuento = false; 
  }
}




}
