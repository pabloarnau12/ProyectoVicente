import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService } from '../../../service/shop.service';
import { Tiendas } from '../../../common/Tiendas';
import { ShopComponent } from "../shop/shop.component";

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [NavbarComponent, RouterLink, RouterLinkActive, ShopComponent],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {
  private readonly apiService: ApiService = inject(ApiService);

  constructor() { }
  data : Tiendas[] = [];

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
