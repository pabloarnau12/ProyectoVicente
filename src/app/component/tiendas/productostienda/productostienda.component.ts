import { Component, inject, Input } from '@angular/core';


import { NgFor, NgIf } from '@angular/common'; // Importa NgFor y NgIf
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService } from '../../../service/shop.service';
import { producto } from '../../../common/productos';
import { ProductComponent } from "../product/product.component";

@Component({
  selector: 'app-productostienda',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, RouterLinkActive, ProductComponent], // Añade NgFor y NgIf a los imports
  templateUrl: './productostienda.component.html',
  styleUrls: ['./productostienda.component.css']
})
export class ProductostiendaComponent {

  
  private readonly apiService: ApiService = inject(ApiService);
  data : producto[] = [];
  private id!: string;
  constructor(private activeRoute: ActivatedRoute) {}


  ngOnInit(): void {
      
      this.activeRoute.params.subscribe(params => {
        this.id = params['id'];
      });
      console.log(this.id);
      this.llenardatabyID();

  }



llenardatabyID(): void {
  this.apiService.getProductsByShop(this.id).subscribe(
    {
    next: value => {this.data = value;
    console.log(this.data);
    },
    error: err => console.error,
    complete : () => console.log("carga de productos completa") 
  }
  )
}
}
