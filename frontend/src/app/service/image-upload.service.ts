import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  private readonly uploadUrl = 'http://localhost:3300/api/upload/';

  constructor(private http: HttpClient) {}

  uploadProfileImage(image: File): Observable<any> {
    const token = localStorage.getItem('token');  // Obtener el token del localStorage o de donde lo tengas almacenado

    if (!token) {
      throw new Error('Token no encontrado');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);  // Agregar el token al encabezado

    const formData = new FormData();
    formData.append('image', image);

    return this.http.post(this.uploadUrl + "profile_picture", formData, { headers });  // Incluir los headers en la solicitud
  }

  uploadProductImage(image: File, ID_Producto : string): Observable<any> {
    const token = localStorage.getItem('token');  // Obtener el token del localStorage o de donde lo tengas almacenado

    if (!token) {
      throw new Error('Token no encontrado');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);  // Agregar el token al encabezado

    const formData = new FormData();
    formData.append('image', image);
    formData.append('ID_Producto', ID_Producto)

    return this.http.post(this.uploadUrl + "product_picture", formData, { headers });  // Incluir los headers en la solicitud
  }


  uploadShopImage(image: File, ID_Establecimiento: string): Observable<any> {
    const token = localStorage.getItem('token'); // Obtener el token del localStorage
  
    if (!token) {
      throw new Error('Token no encontrado');
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Agregar el token al encabezado
  
    const formData = new FormData();
    formData.append('image', image);
    formData.append('ID_Establecimiento', ID_Establecimiento); // Agregar el ID del establecimiento
  
    return this.http.post(this.uploadUrl + "shop_picture", formData, { headers }); // Enviar la solicitud al endpoint de la tienda
  }
}
