import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private urlApi = "http://localhost:3000/api/productos"

  public getData(): Observable <any>{
    return this.http.get<any>(this.urlApi)
  }


}
