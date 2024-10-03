import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';


import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService } from '../../../service/shop.service';

@Component({
  selector: 'app-pagina-producto',
  standalone: true,
  imports: [NavbarComponent, RouterLink, RouterLinkActive],
  templateUrl: './pagina-producto.component.html',
  styleUrl: './pagina-producto.component.css'
})
export class PaginaProductoComponent {
  private readonly apiService: ApiService = inject(ApiService);
  constructor(
    private activeRoute: ActivatedRoute) { }

  data : any = [];
  id: string | null = null;

  ngOnInit(): void {
    console.log(this.id);
    const nombreParam = this.activeRoute.snapshot.paramMap.get('id'); 
    this.id = nombreParam !== null ? nombreParam : null;
    
    this.llenardatabyID();

  }

  llenardatabyID() {
    if (this.id !== null) {
      this.apiService.getShopsbyID(this.id).subscribe(data => {
        this.data = data;
        console.log(this.data);
      });
    } else {
      console.error('productoId es null, no se puede hacer la petición.');
    }
  }
}
