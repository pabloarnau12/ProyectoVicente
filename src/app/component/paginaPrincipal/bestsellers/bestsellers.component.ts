import { Component, OnInit } from '@angular/core';


import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService } from '../../../service/shop.service';

@Component({
  selector: 'app-bestsellers',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './bestsellers.component.html',
  styleUrl: './bestsellers.component.css'
})
export class BestsellersComponent implements OnInit{
  data : any = [];
  constructor(private router: Router, private apiService : ApiService) { }

  ngOnInit(): void {

    this.llenardata();
  }



  llenardata(){
    this.apiService.getShopsbyID("tienda1").subscribe (data =>{
      this.data = data;
      console.log(this.data);
      
    })
  }
}
