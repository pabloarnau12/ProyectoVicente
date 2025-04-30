import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  UploadProductImageResponse,
  UploadProfileImageResponse,
  UploadShopImageResponse,
} from '../common/ImageUpload';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  private readonly uploadUrl = 'http://localhost:3300/api/upload/';

  constructor(private http: HttpClient) {}

  uploadProfileImage(image: File): Observable<UploadProfileImageResponse> {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token no encontrado');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const formData = new FormData();
    formData.append('image', image);

    return this.http.post<UploadProfileImageResponse>(
      this.uploadUrl + 'profile_picture',
      formData,
      { headers }
    );
  }
  uploadProductImage(
    image: File,
    ID_Producto: string
  ): Observable<UploadProductImageResponse> {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token no encontrado');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const formData = new FormData();
    formData.append('image', image);
    formData.append('ID_Producto', ID_Producto);

    return this.http.post<UploadProductImageResponse>(
      this.uploadUrl + 'product_picture',
      formData,
      { headers }
    );
  }

  uploadShopImage(
    image: File,
    ID_Establecimiento: string
  ): Observable<UploadShopImageResponse> {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token no encontrado');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const formData = new FormData();
    formData.append('image', image);
    formData.append('ID_Establecimiento', ID_Establecimiento);

    return this.http.post<UploadShopImageResponse>(
      this.uploadUrl + 'shop_picture',
      formData,
      { headers }
    );
  }
}
