import { Component, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';


@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
  // Puedes agregar propiedades para almacenar los datos del formulario, si es necesario
  nombre: string = '';
  email: string = '';
  mensaje: string = '';

  // Método para enviar el formulario
  onSubmit() {
    console.log('Formulario enviado:', this.nombre, this.email, this.mensaje);
    // Aquí puedes implementar la lógica para enviar los datos del formulario
  }
}
