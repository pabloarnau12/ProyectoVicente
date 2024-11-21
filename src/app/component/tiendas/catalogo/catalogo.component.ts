import { Component, inject, NgModule } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService } from '../../../service/shop.service';
import { Tiendas } from '../../../common/Tiendas';
import { ShopComponent } from "../shop/shop.component";
import { FormsModule, NgModel } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [RouterLink, ShopComponent, FormsModule, MatIconModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {
  private readonly apiService: ApiService = inject(ApiService);

  constructor() { }
  data : Tiendas[] = [];



  filteredData: Tiendas[] = [];
  tiposUnicos: string[] = [];
  searchTerm: string = '';


  ngOnInit(): void {
    this.llenardata();
    
  }


  filterData(): void {
    if (this.searchTerm) {
      this.filteredData = this.data.filter(item => 
        item.Nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredData = this.data;
      
    }
  }

  llenardata(): void{
  this.apiService.getShops().subscribe (data =>{
    this.data = data;
    console.log(this.data);  
    })
  }
}
