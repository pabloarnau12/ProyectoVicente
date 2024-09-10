import { Component } from '@angular/core';
import { ColumnasContactoComponent } from '../columnas-contacto/columnas-contacto.component';
import { FormularioContactoComponent } from '../formulario-contacto/formulario-contacto.component';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [ColumnasContactoComponent, FormularioContactoComponent],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {

}
