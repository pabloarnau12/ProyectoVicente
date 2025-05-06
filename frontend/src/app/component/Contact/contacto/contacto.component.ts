import { Component, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css',
})
export class ContactoComponent {
  nombre: string = '';
  email: string = '';
  mensaje: string = '';
  //no funciona ya que se debería de pagar un servidor para enviar el correo
  onSubmit() {}
}
