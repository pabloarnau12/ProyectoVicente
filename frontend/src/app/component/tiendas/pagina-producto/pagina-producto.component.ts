import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { ActivatedRoute,Router,RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService } from '../../../service/shop.service';
import { NgClass } from '@angular/common';
import { Tiendas } from '../../../common/Tiendas';
import { CalificacionesService } from '../../../service/calificaciones.service';
import { MatIcon } from '@angular/material/icon';
import { FavoriteShopService } from '../../../service/favorite-shop.service';
import { AuthService } from '../../../service/auth.service';


@Component({
  selector: 'app-pagina-producto',
  standalone: true,
  imports: [RouterLink, NgClass, MatIcon],
  templateUrl: './pagina-producto.component.html',
  styleUrl: './pagina-producto.component.css'
})
export class PaginaProductoComponent implements OnInit{
  private readonly apiService: ApiService = inject(ApiService);
  private readonly apiCalificaciones : CalificacionesService = inject(CalificacionesService)
  private readonly apiFavoriteShops : FavoriteShopService = inject(FavoriteShopService)
  private readonly authService : AuthService = inject(AuthService)
  constructor(private activeRoute: ActivatedRoute, private router: Router) { }

  media: any;
  isFavorite: boolean = false;
  tienda: any;  
  relatedShops: Tiendas[] = [];
  id: string | null = null;


  ngOnInit(): void {
    
    const nombreParam = this.activeRoute.snapshot.paramMap.get('id'); 
    this.id = nombreParam !== null ? nombreParam : null;
    this.llenardatabyID();
    this.getRelatedShops();
    this.calcularMedia();
    this.checkIfFavorite();

  }

  llenardatabyID() {
    if (this.id !== null) {
      this.apiService.getShopsbyID(this.id).subscribe(data => {
        this.tienda = data;
        
      });
    } else {
      console.error('productoId es null, no se puede hacer la petición.');
    }
  }

  isOpen(): boolean {
    const currentTime = new Date();
    
    const currentTimeString = currentTime.toTimeString().split(' ')[0]; 
    
    if (currentTimeString >= this.tienda.Horario_Apertura && currentTimeString <= this.tienda.Horario_Cierre) {
      return true;
    } else {
      return false;
    }
  }
  
  
  getRelatedShops() {
    this.apiService.getShops().subscribe(
      (data: Tiendas[]) => {

        this.relatedShops = data.filter(shop => shop.Tipo === this.tienda.Tipo && shop.Nombre != this.tienda.Nombre).slice(0,4);
        console.log(this.relatedShops);
      },
      (error) => {
        console.error('Error al obtener las tiendas:', error);
      }
      
    );
  }


  calcularMedia() {
    if (this.id !== null) {
      this.apiCalificaciones.getCalificacionesbyID(this.id).subscribe(
        data => {
          this.media = data.media_calificacion;
          console.log(this.media);
        },
        error => {
          console.error('Error al obtener calificaciones:', error);
        }
      );
    } else {
      console.error('productoId es null, no se puede hacer la petición.');
    }
  }

  addFavorite(): void {
    const token = localStorage.getItem('token'); // Obteniendo el token del localStorage
  
    if (token) {
      console.log("el perfil esta logeado");
      this.authService.getProfile(token).subscribe(
        (profile) => {
          const user = profile; // Perfil del usuario
  
          // Aquí se suscribe a la llamada para guardar la tienda favorita
          this.apiFavoriteShops.addFavoriteShop(user.ID_Usuario, this.tienda.ID_Establecimiento).subscribe(
            response => {
              console.log(user.ID_Usuario, this.tienda.ID_Establecimiento + " tienda añadida");
              this.isFavorite = true; // Marcar como favorito
            },
            error => {
              console.error('Error al añadir la tienda a favoritos:', error);
              alert('Error al añadir la tienda a favoritos: ' + error.message);
            }
          );
        },
        (error) => {
          console.error('Error al cargar el perfil', error);
        }
      );     
    } else {
      this.router.navigate(['/iniciarsesion']);
    }
  }
  

  deleteFavorite(): void{
    const token = localStorage.getItem('token');

    if(token){
      console.log("el perfil esta logeado");

        this.authService.getProfile(token).subscribe(
          (profile) => {
            const user = profile;
            this.apiFavoriteShops.removeFavoriteShop(user.ID_Usuario, this.tienda.ID_Establecimiento).subscribe(
              response => {
                console.log(user.ID_Usuario, this.tienda.ID_Establecimiento + " tienda eliminada");
                this.isFavorite = false; // Marcar como favorito
              },
              error => {
                console.error('Error al eliminar la tienda a favoritos:', error);
                alert('Error al eliminar la tienda a favoritos: ' + error.message);
              }
            );
          },
          (error) => {
            console.error('Error al cargar el perfil', error);
          }
        );
    }else{
      this.router.navigate(['/iniciarsesion'])
    }
  }


  checkIfFavorite() {
      const token = localStorage.getItem('token');
      if(token){
        console.log("el perfil esta logeado");

          this.authService.getProfile(token).subscribe(
            (profile) => {
              const user = profile;
              this.apiFavoriteShops.checkFavoriteShop(user.ID_Usuario, this.tienda.ID_Establecimiento).subscribe(
                response => {
                  this.isFavorite = response.isFavorite;
                  console.log('Estado de favorito:', this.isFavorite);
                },
                error => {
                  console.error('Error al comprobar si la tienda es favorita:', error);
                  alert('Error al comprobar si la tienda es favorita: ' + error.message);
                }
              );
            },
            (error) => {
              console.error('Error al cargar el perfil', error);
            }
          );
      }
  }
}
