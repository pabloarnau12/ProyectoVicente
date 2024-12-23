import { Component, inject, OnInit } from '@angular/core';
import { Tiendas } from '../../../common/Tiendas';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService } from '../../../service/shop.service';
import { calificacion } from '../../../common/Calificaciones';
import { CalificacionesService } from '../../../service/calificaciones.service';

@Component({
  selector: 'app-bestsellers',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './bestsellers.component.html',
  styleUrl: './bestsellers.component.css'
})
export class BestsellersComponent implements OnInit{
  private readonly shopService : ApiService = inject(ApiService)
  data : any = [];
  constructor(private router: Router) {

   }


  ngOnInit(): void {

    this.loadData();
  }


  loadData(){
    this.shopService.getMostValoratedShops(3).subscribe(
      {
        next: value => {
            this.data = value
        }, 
        error: err => {
          console.error("error al cargar las tiendas mejor valoradas")
        },
        complete :  () => {
          console.log("Carga completa de tiendas mejor valoradas")
        }
      }
    )
  }
}
