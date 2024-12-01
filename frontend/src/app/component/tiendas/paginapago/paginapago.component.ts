import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-paginapago',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './paginapago.component.html',
  styleUrl: './paginapago.component.css'
})
export class PaginapagoComponent {



  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router) { }

  ;
  

  ngOnInit(): void {
      
  }




}
