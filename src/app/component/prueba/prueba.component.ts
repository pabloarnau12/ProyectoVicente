import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [],
  templateUrl: './prueba.component.html',
  styleUrl: './prueba.component.css'
})
export class PruebaComponent {


  data : any [] = [];
  
  constructor(private apiService: ApiService){}

  ngOnInit(): void {
    this.llenardata();
  }

  llenardata(){
    this.apiService.getData().subscribe (data =>{
      this.data = data;
      console.log(this.data);
    })
  }
}
