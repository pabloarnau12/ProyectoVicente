import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';


import { ActivatedRoute,RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService } from '../../../service/shop.service';
import { NgClass } from '@angular/common';

import { Tiendas } from '../../../common/Tiendas';
import { CalificacionesService } from '../../../service/calificaciones.service';


@Component({
  selector: 'app-pagina-producto',
  standalone: true,
  imports: [NavbarComponent, RouterLink, RouterLinkActive, NgClass],
  templateUrl: './pagina-producto.component.html',
  styleUrl: './pagina-producto.component.css'
})
export class PaginaProductoComponent implements OnInit{
  private readonly apiService: ApiService = inject(ApiService);
  private readonly apiCalificaciones : CalificacionesService = inject(CalificacionesService)
  constructor(private activeRoute: ActivatedRoute) { }

  media: any;

  tienda: any;  
  relatedShops: Tiendas[] = [];
  id: string | null = null;


  ngOnInit(): void {
    
    const nombreParam = this.activeRoute.snapshot.paramMap.get('id'); 
    this.id = nombreParam !== null ? nombreParam : null;
    this.llenardatabyID();
    this.getRelatedShops();
    this.calcularMedia();

  }

  llenardatabyID() {
    if (this.id !== null) {
      this.apiService.getShopsbyID(this.id).subscribe(data => {
        this.tienda = data;
        
      });
    } else {
      console.error('productoId es null, no se puede hacer la petición.');
    }
  }

  isOpen(): boolean {
    const currentTime = new Date();
    
    const currentTimeString = currentTime.toTimeString().split(' ')[0]; 
    
    if (currentTimeString >= this.tienda.Horario_Apertura && currentTimeString <= this.tienda.Horario_Cierre) {
      return true;
    } else {
      return false;
    }
  }
  
  
  getRelatedShops() {
    this.apiService.getShops().subscribe(
      (data: Tiendas[]) => {

        this.relatedShops = data.filter(shop => shop.Tipo === this.tienda.Tipo && shop.Nombre != this.tienda.Nombre).slice(0,5);
        console.log(this.relatedShops);
      },
      (error) => {
        console.error('Error al obtener las tiendas:', error);
      }
      
    );
  }


  calcularMedia() {
    if (this.id !== null) {
      this.apiCalificaciones.getCalificacionesbyID(this.id).subscribe(
        data => {
          this.media = data.media_calificacion;
          console.log(this.media);
        },
        error => {
          console.error('Error al obtener calificaciones:', error);
        }
      );
    } else {
      console.error('productoId es null, no se puede hacer la petición.');
    }
  }
}
