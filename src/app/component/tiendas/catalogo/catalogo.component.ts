import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { Producto, Productos } from '../../../common/productos';

import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { PaginaProductoComponent } from '../pagina-producto/pagina-producto.component';
import { query } from 'express';
import { ApiService } from '../../../service/shop.service';
import { ProductoUnico } from '../../../common/producto-unico';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [NavbarComponent, RouterLink, RouterLinkActive],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {
  constructor(private router: Router, private apiService : ApiService) { }
  data : ProductoUnico[] = [];

  ngOnInit(): void {

    this.llenardata();
  }

  

    llenardata(): void{
    this.apiService.getShops().subscribe (data =>{
      this.data = data;
      console.log(this.data);
      
    })
  }
}
