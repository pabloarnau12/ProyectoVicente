import { Component, OnInit } from '@angular/core';
import { ProductoUnico } from '../../common/producto-unico';
import { DataService } from '../../service/data.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Productos } from '../../common/productos';

@Component({
  selector: 'app-bestsellers',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './bestsellers.component.html',
  styleUrl: './bestsellers.component.css'
})
export class BestsellersComponent implements OnInit{
  Productos! : Productos;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.loadBestSellers();
  }

  loadBestSellers() {
    this.dataService.getProducto().subscribe({
      next: (data) => {
        if (data) {
          console.log(data);
          this.Productos = data;
        }
      },
      error: error => {
        console.log(error);
      },
      complete: () => {}
    });
  }
}
