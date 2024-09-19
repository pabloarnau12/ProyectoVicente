import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductoUnico } from '../../common/producto-unico';
import { DataService } from '../../service/data.service';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-pagina-producto',
  standalone: true,
  imports: [NavbarComponent, RouterLink, RouterLinkActive],
  templateUrl: './pagina-producto.component.html',
  styleUrl: './pagina-producto.component.css'
})
export class PaginaProductoComponent {

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private apiService : ApiService) { }

  data : any = [];
  nombre: string | null = null;

  ngOnInit(): void {
    const nombreParam = this.activeRoute.snapshot.paramMap.get('nombre'); 
    this.nombre = nombreParam !== null ? nombreParam : null;
    this.llenardatabyID();

  }

llenardatabyID() {
  if (this.nombre !== null) {
    this.apiService.getShopsbyID(this.nombre).subscribe(data => {
      this.data = data;
      console.log(this.data);
    });
  } else {
    console.error('productoId es null, no se puede hacer la petición.');
  }
}
}
