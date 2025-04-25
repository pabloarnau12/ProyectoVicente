import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../service/auth.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ImageUploadService } from '../../../../service/image-upload.service';
import { FormsModule } from '@angular/forms';
import { Tiendas } from '../../../../common/Tiendas';
import { ShopService } from '../../../../service/shop.service';
import { MatIcon } from '@angular/material/icon';
import { CurrencyPipe, DatePipe, JsonPipe, ViewportScroller } from '@angular/common';
import { ProductosService } from '../../../../service/productos.service';
import { producto } from '../../../../common/productos';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ordersService } from '../../../../service/orders.service';
import { PromocionesService } from '../../../../service/promociones.service';
@Component({
  selector: 'app-perfil-admin',
  standalone: true,
  imports: [FormsModule, RouterLink, MatIcon, CurrencyPipe, MatProgressSpinnerModule, DatePipe],
  templateUrl: './perfil-admin.component.html',
  styleUrl: './perfil-admin.component.css'
})
export class PerfilAdminComponent implements OnInit {
  protected readonly authService: AuthService = inject(AuthService);
  protected readonly imageUploadService: ImageUploadService = inject(ImageUploadService);
  protected readonly shopService: ShopService = inject(ShopService);
  protected readonly productosService: ProductosService = inject(ProductosService);
  protected readonly ordersService: ordersService = inject(ordersService);
  protected readonly promocionesService: PromocionesService = inject(PromocionesService); // Inyecta el servicio de promociones
  
  user: any = {};
  tienda: any = {};
  Horario_Apertura: any;
  Horario_Cierre: any;
  Descripcion: any


  productos: any = [];
  Pedidos: any = [];
  Estado: string = 'Pendiente';

  promociones: any = [];

  selectedFile: File | null = null;
  isloading: Boolean = false;




  newProduct: any = {
    ID_Producto: 0,
    ID_Establecimiento: 0,
    Nombre: '',
    Descripcion: '',
    Precio: 0,
    Disponibilidad: 0,
    Tipo: '',
    Foto: '',
  };

  newPromotion: any = {
    ID_Producto: 0,
    ID_Establecimiento: 0,
    titulo: '',
    descripcion: '',
    descuento: 0,
    fechaFin: '',
    tipoPromocion: 'porcentaje', // Nuevo campo
    codigoPromocion: '', // Nuevo campo
    condiciones: '' // Nuevo campo
  };



  constructor(private router: Router, private route: ActivatedRoute,
    private viewportScroller: ViewportScroller){
    this.loadProfile();
  }
  ngOnInit() {
    // Suscríbete a los cambios en el fragmento de la URL
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        // Espera a que el DOM se actualice
        setTimeout(() => {
          this.viewportScroller.scrollToAnchor(fragment);
        }, 100);
      }
    });
  }
  //esto es para que al hacer click en el boton de la barra de navegacion se desplace hasta el fragmento
  scrollTo(fragment: string): void {
    this.viewportScroller.scrollToAnchor(fragment);
  }
  
  loadProfile(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.getProfile(token).subscribe(
        (profile) => {
          this.user = profile;
          console.log('Perfil cargado:', this.user); // Para depuración
          this.loadTienda(); 
        },
        (error) => {
          console.error('Error al cargar el perfil', error);
          this.onLogout()
        }
      );
    } else {
      console.error('No se encontró el token');
      this.onLogout();
    }
  }

  loadTienda(): void {
      this.shopService.getShopByAdmin(this.user.ID_Usuario).subscribe(
        (tienda) => {
          this.tienda = tienda;
          console.log('Tienda cargada:', this.tienda); // Para depuración
          this.Horario_Apertura = this.tienda.Horario_Apertura;
          this.Horario_Cierre = this.tienda.Horario_Cierre;
          this.Descripcion = this.tienda.Descripcion;
          this.loadProductos();
          this.getOrders();
          this.loadPromotions();
        },
        (error) => {
          console.error('Error al cargar la tienda', error);
        }
      );
  }

  loadProductos(): void {
    this.shopService.getProductsByShop(this.tienda.ID_Establecimiento).subscribe(
      (productos) => {
        this.productos = productos;
        console.log('Productos Cargados:', this.productos);
      },
      (error)=> {
        console.error('error al cargar los productos', error)
      }
    )
  }

  
    secondOportunityLogout(){
      Swal.fire({
        title: "¿Seguro que quieres marcharte?",
        showDenyButton: true, 
        showCancelButton: true, 
        showConfirmButton: false,
        denyButtonText: `Cerrar Sesión`, 
        cancelButtonText: 'Cancelar', 
  
      }).then((result) => {
        if (result.isDenied) {
          this.onLogout(); // Llama a la función para cerrar sesión
        }
      });
      
    }
  
    onLogout(): void {
      this.authService.logout();
      this.router.navigate(['/home']).then(() => {
        // Forzar la recarga de la página
        window.location.reload();
      });
    }


    updateShopImage(): void {
      if (!this.selectedFile) {
        alert('Por favor, selecciona una imagen.');
        return;
      }
    
      this.imageUploadService.uploadShopImage(this.selectedFile, this.tienda.ID_Establecimiento).subscribe(
        (response) => {
          console.log('Imagen actualizada con éxito:', response);
          this.tienda.foto = response.url; // Actualizar la imagen en la vista
          alert('Imagen actualizada correctamente.');
        },
        (error) => {
          console.error('Error al actualizar la imagen:', error);
          alert('Error al actualizar la imagen.');
        }
      );
    }
    onFileChange(event: any) {
      this.selectedFile = event.target.files[0];
    }
    onSubmit() {
      if (this.selectedFile) {
        this.isloading = true;
        this.imageUploadService.uploadProfileImage(this.selectedFile).subscribe({
          next: (response: any) => {
            console.log('Imagen subida:', response.url);
            this.loadProfile();
            this.isloading = false;
          },
          error: (error) => {
            console.error('Error al subir la imagen:', error);
          },
        });
      }
    }

    onSubmitHorario() {
      const token = localStorage.getItem('token');
      if (token) {
        this.authService.updateHorario(this.Horario_Apertura, this.Horario_Cierre, this.tienda.ID_Establecimiento, token).subscribe(
          (response: any) => {
            Swal.fire({
              icon: 'success',
              title: '¡Horario Actualizado!',
              text: 'El horario ha sido actualizado correctamente.',
            });
            this.loadProfile()
          },
          (error: any) => {
            console.error('Error al actualizar el horario', error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Hubo un error al actualizar el horario. Por favor, intenta nuevamente.',
            });
          }
        );
      }else{
        this.onLogout();
      }
    }


    onSubmitDescripcion() {
      const token = localStorage.getItem('token');
      if (token) {
        this.authService.updateDescription(this.Descripcion, this.tienda.ID_Establecimiento, token).subscribe(
          (response: any) => {
            Swal.fire({
              icon: 'success',
              title: '¡Descripcion Actualizada!',
              text: 'La descripcion ha sido actualizada correctamente.',
            });
            this.loadProfile()
          },
          (error: any) => {
            console.error('Error al actualizar el horario', error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Hubo un error al actualizar la Descripcion. Por favor, intenta nuevamente.',
            });
          }
        );
      }else{
        this.onLogout();
      }
    }

    deleteProduct(ID_Producto: any){
        this.productosService.deleteProductoById(ID_Producto, this.tienda.ID_Establecimiento).subscribe(
          (response: any) => {
            Swal.fire({
              icon: 'success',
              title: '¡Producto Eliminado!',
              text: 'El producto ha sido eliminado correctamente.',
            });
            this.loadProductos();
          },
          (error: any) => {
            console.error('Error al eliminar el producto', error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Hubo un error al eliminar el producto. Por favor, intenta nuevamente.',
            });
          }
        );
    }


    addProduct() {
      this.isloading = true;
      if (!this.selectedFile) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Por favor, selecciona una imagen para el producto.',
        });
        return;
      }
  
      const formData = new FormData();
      formData.append('Nombre', this.newProduct.Nombre);
      formData.append('Descripcion', this.newProduct.Descripcion);
      formData.append('Precio', this.newProduct.Precio.toString());
      formData.append('Disponibilidad', this.newProduct.Disponibilidad.toString());
      formData.append('Tipo', this.newProduct.Tipo);
      formData.append('ID_Establecimiento', this.tienda.ID_Establecimiento);
      formData.append('image', this.selectedFile);
  
      this.productosService.addProducto(formData).subscribe(
        (response: any) => {
          Swal.fire({
            icon: 'success',
            title: '¡Producto Añadido!',
            text: 'El producto ha sido añadido correctamente.',
          });
          this.loadProductos();
          this.isloading = false;
        },
        (error: any) => {
          console.error('Error al añadir el producto', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un error al añadir el producto. Por favor, intenta nuevamente.',
          });

          this.isloading = false;
        }
      );
    }

    getOrders(){
      this.ordersService.getOrdersByShopAndState(this.tienda.ID_Establecimiento, this.Estado).subscribe(
        (response: any) => {
          console.log(this.tienda.ID_Establecimiento, this.Estado);
          this.Pedidos = response;
          this.Pedidos = response.map((pedido: any) => {
            return {
              ...pedido,
              productos: JSON.parse(pedido.productos)
            };
          });
          console.log('Pedidos:', response);
        },
        (error: any) => {
          console.error('Error al cargar los pedidos', error);
        }
      );
    } 

    loadPromotions() {
      this.promocionesService.getPromotionsByShop(this.tienda.ID_Establecimiento).subscribe(
        (response: any) => {
          this.promociones = response;
        },
        (error: any) => {
          console.error('Error al cargar las promociones', error);
        }
      );
    }

    addPromotion() {

      // const formPromotion = new FormData();
      // formPromotion.append('ID_Producto', this.newPromotion.ID_Producto);
      // formPromotion.append('ID_Establecimiento', this.tienda.ID_Establecimiento);
      // formPromotion.append('titulo', this.newPromotion.titulo);
      // formPromotion.append('descripcion', this.newPromotion.descripcion);
      // formPromotion.append('descuento', this.newPromotion.descuento.toString());
      // formPromotion.append('fechaInicio', this.newPromotion.fechaInicio);
      // formPromotion.append('fechaFin', this.newPromotion.fechaFin);
      // formPromotion.append('tipoPromocion', this.newPromotion.tipoPromocion); // Nuevo campo
      // formPromotion.append('codigoPromocion', this.newPromotion.codigoPromocion); // Nuevo campo
      // formPromotion.append('condiciones', this.newPromotion.condiciones); // Nuevo campo

      // console.log(this.newPromotion)
      // console.log(this.tienda.ID_Establecimiento);
      // console.log(formPromotion);

      this.newPromotion.ID_Establecimiento = this.tienda.ID_Establecimiento;
      this.promocionesService.addPromotion(this.newPromotion).subscribe(
        (response: any) => {
          Swal.fire({
            icon: 'success',
            title: '¡Promoción Añadida!',
            text: 'La promoción ha sido añadida correctamente.',
          });
          this.loadPromotions(); // Cargar las promociones después de añadir una nueva
        },
        (error: any) => {
          console.error('Error al añadir la promoción', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un error al añadir la promoción. Por favor, intenta nuevamente.',
          });
        }
      );
    }

    desactivarPromocion(id: number) {
      this.promocionesService.deletePromotion(id).subscribe(
        (response: any) => {
          Swal.fire({
            icon: 'success',
            title: '¡Promoción Eliminada!',
            text: 'La promoción ha sido eliminada correctamente.',
          });
          this.loadPromotions(); // Cargar las promociones después de eliminar una
        },
        (error: any) => {
          console.error('Error al eliminar la promoción', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un error al eliminar la promoción. Por favor, intenta nuevamente.',
          });
        }
      );
    }
    
}
