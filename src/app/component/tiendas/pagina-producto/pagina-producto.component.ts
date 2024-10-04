import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';


import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService } from '../../../service/shop.service';
import { DatePipe, NgClass } from '@angular/common';
import { producto } from '../../../common/productos';
import { Tiendas } from '../../../common/Tiendas';
import { CalificacionesService } from '../../../service/calificaciones.service';
import { calificacion } from '../../../common/Calificaciones';

@Component({
  selector: 'app-pagina-producto',
  standalone: true,
  imports: [NavbarComponent, RouterLink, RouterLinkActive, NgClass, DatePipe],
  templateUrl: './pagina-producto.component.html',
  styleUrl: './pagina-producto.component.css'
})
export class PaginaProductoComponent implements OnInit{

  private readonly apiService: ApiService = inject(ApiService);
  private readonly apiCalificaciones : CalificacionesService = inject(CalificacionesService)
  constructor(private activeRoute: ActivatedRoute) { }


  currentTime: Date = new Date();
  tienda: any;
  id: string | null = null;
  califications: calificacion[] = [];
  promedio: any;

  ngOnInit(): void {
    
    const nombreParam = this.activeRoute.snapshot.paramMap.get('id'); 
    this.id = nombreParam !== null ? nombreParam : null;
    this.llenardatabyID();
    this.getCalificacionesbyID();

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

  formatTime(date: Date): string {
    return date.toTimeString().split(' ')[0];
  }

  isOpen(): boolean {
    const currentTimeString = this.formatTime(this.currentTime);
    return currentTimeString >= this.tienda.Horario_Apertura && 
           currentTimeString <= this.tienda.Horario_Cierre;
  }


  getCalificacionesbyID() {
    if (this.id !== null) {
      this.apiCalificaciones.getCalificacionesbyID(this.id).subscribe(
        data => {
          this.califications = data;
          console.log(this.califications);
          this.calcularPromedio();
        },
        error => {
          console.error('Error al obtener calificaciones:', error);
        }
      );
    } else {
      console.error('productoId es null, no se puede hacer la petición.');
    }
  }
  
  calcularPromedio() {
    if (this.califications && this.califications.length > 0) {
      const suma = this.califications.reduce((acumulador, califications) => {
        // Asumiendo que cada calificación tiene una propiedad 'valor'
        return acumulador + califications.Calificacion_Establecimiento;
      }, 0);
      
      this.promedio = suma / this.califications.length;
      console.log('Promedio de calificaciones:', this.promedio);
    } else {
      console.log('No hay calificaciones para calcular el promedio.');
      this.promedio = 0;
    }
  }
}
