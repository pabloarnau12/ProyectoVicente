import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [],
  templateUrl: './prueba.component.html',
  styleUrl: './prueba.component.css'
})
export class PruebaComponent {
  productoId: number | null = null;
  data : any = [];
  activeRoute: any;
  dataService: any;
  
  // databyID : any [] = [];
  constructor(private apiService: ApiService, private route : ActivatedRoute){}

  ngOnInit(): void {
    // this.llenardata();
    
    // Obtener el parámetro de la URL y convertirlo a número
    const idParam = this.route.snapshot.paramMap.get('id');
    this.productoId = idParam !== null ? Number(idParam) : null;

    console.log(this.productoId); // Muestra el ID como número, por ejemplo, 42

    this.llenardatabyID();
  }

  // llenardata(){
  //   this.apiService.getData().subscribe (data =>{
  //     this.data = data;
  //     console.log(this.data);
  //   })
  // }


  llenardatabyID() {
    if (this.productoId !== null) {
      this.apiService.getDatabyID(this.productoId).subscribe(data => {
        this.data = data;
        console.log(this.data);
      });
    } else {
      console.error('productoId es null, no se puede hacer la petición.');
    }
  }
  


}
