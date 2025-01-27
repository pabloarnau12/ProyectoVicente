import { Component, inject, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute,Router,RouterLink } from '@angular/router';
import { ShopService } from '../../../service/shop.service';
import { CommonModule, NgClass } from '@angular/common';
import { Tiendas } from '../../../common/Tiendas';
import { CalificacionesService } from '../../../service/calificaciones.service';
import { MatIcon } from '@angular/material/icon';
import { FavoriteShopService } from '../../../service/favorite-shop.service';
import { AuthService } from '../../../service/auth.service';
import { FormsModule, NgModel } from '@angular/forms';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-pagina-producto',
  standalone: true,
  imports: [RouterLink, NgClass, MatIcon, CommonModule, FormsModule],
  templateUrl: './pagina-producto.component.html',
  styleUrl: './pagina-producto.component.css'
})
export class PaginaProductoComponent implements OnInit{
  private readonly ShopService: ShopService = inject(ShopService);
  private readonly apiCalificaciones : CalificacionesService = inject(CalificacionesService)
  private readonly apiFavoriteShops : FavoriteShopService = inject(FavoriteShopService)
  private readonly authService : AuthService = inject(AuthService)
  constructor(private activeRoute: ActivatedRoute, private router: Router) { }

  rating: number = 0;  // Calificación seleccionada
  comment: string = '';  // Comentario del usuario
  media: any;
  isFavorite: boolean = false;
  tienda: any;  
  relatedShops: Tiendas[] = [];
  id: string | null = null;
  comentarios: any[] = []
  estrellas: number[] = Array(5).fill(0);

  ngOnInit(): void {
    
    const nombreParam = this.activeRoute.snapshot.paramMap.get('id'); 
    this.id = nombreParam !== null ? nombreParam : null;
    this.llenardatabyID();
    this.getRelatedShops();
    this.calcularMedia();
    this.checkIfFavorite();
    this.getComentarios();

  }

  llenardatabyID() {
    if (this.id !== null) {
      this.ShopService.getShopsbyID(this.id).subscribe(data => {
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
    this.ShopService.getShops().subscribe(
      (data: Tiendas[]) => {

        this.relatedShops = data.filter(shop => shop.Categoria === this.tienda.Categoria && shop.Nombre != this.tienda.Nombre).slice(0,4);
        console.log(this.tienda.Categoria + "hola")
        console.log(this.relatedShops);
      },
      (error) => {
        console.error('Error al obtener las tiendas:', error);
      }
      
    );
  }

  getComentarios(){
    if(this.id != null){
      this.apiCalificaciones.getCalificacionesEstablecimientosbyID(this.id).subscribe(
        data => {
          this.comentarios = data
          console.log(this.comentarios)
        }
      )
    }
    
  }


  calcularMedia() {
    if (this.id !== null) {
      this.apiCalificaciones.getCalificacionPromedioEstablecimientos(this.id).subscribe(
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
          this.router.navigate(['/iniciarsesion']);
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
              // this.router.navigate(['/iniciarsesion'])
              console.error('Error al cargar el perfil', error);
            }
          );
      }
  }

  addnewComment(){
    const token = localStorage.getItem('token');
    if(token){
        this.authService.getProfile(token).subscribe(
          (profile) => {
            const user = profile;
            this.apiCalificaciones.addComentarioEstablecimiento(user.ID_Usuario, this.rating, this.comment, this.tienda.ID_Establecimiento ).subscribe(
              response => {
                console.log("Comentario Añadido con exito");
                Swal.fire({
                  icon: 'success',
                  title: '¡Gracias!',
                  text: response.message,
              });
                this.getComentarios();
              },
              error => {
                console.error('Error al insertar el comentario:', error);
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: error.error.message,
              });
              }
            );
          },
          (error) => {
            console.error('Error al cargar el perfil', error);
            this.router.navigate(['/iniciarsesion'])
          }
        );
    }else{
      this.router.navigate(['/iniciarsesion'])
    }
  }


  cambiarClase(rating: number) {
    const estrellas = document.querySelectorAll('.star');
    estrellas.forEach((estrella, index) => {
      if (index < rating) {
        estrella.classList.add('selected');
      } else {
        estrella.classList.remove('selected');
      }
    });
  }
}
