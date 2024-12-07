import { Component, inject, OnInit } from '@angular/core';


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
  private readonly apiCalificaciones : CalificacionesService = inject(CalificacionesService)
  data : any = [];
  constructor(private router: Router, private apiService : ApiService) { }

  califications: calificacion[] = [];
  promedio: any;

  ngOnInit(): void {

    this.llenardata();
    this.getCalificacionesbyID();
  }



  llenardata(){
    this.apiService.getShopsbyID("1").subscribe (data =>{
      this.data = data;
      console.log(this.data);
      
    })
  }

  getCalificacionesbyID() {

      this.apiCalificaciones.getCalificacionesEstablecimientos().subscribe(
        data => {
          this.califications = data;
          console.log(this.califications);
          // this.calcularPromedio();
        },
        error => {
          console.error('Error al obtener calificaciones:', error);
        }
      );
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
