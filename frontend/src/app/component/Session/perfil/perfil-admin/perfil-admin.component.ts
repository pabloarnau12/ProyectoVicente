import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../service/auth.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ImageUploadService } from '../../../../service/image-upload.service';
import { FormsModule } from '@angular/forms';
import { Tienda } from '../../../../common/Tiendas';
import { ShopService } from '../../../../service/shop.service';
import { MatIcon } from '@angular/material/icon';
import {
  CurrencyPipe,
  DatePipe,
  JsonPipe,
  ViewportScroller,
} from '@angular/common';
import { ProductosService } from '../../../../service/productos.service';
import { Producto } from '../../../../common/productos';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ordersService } from '../../../../service/orders.service';
import { PromocionesService } from '../../../../service/promociones.service';
@Component({
  selector: 'app-perfil-admin',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    MatIcon,
    CurrencyPipe,
    MatProgressSpinnerModule,
    DatePipe,
  ],
  templateUrl: './perfil-admin.component.html',
  styleUrl: './perfil-admin.component.css',
})
export class PerfilAdminComponent implements OnInit {
  protected readonly authService: AuthService = inject(AuthService);
  protected readonly imageUploadService: ImageUploadService =
    inject(ImageUploadService);
  protected readonly shopService: ShopService = inject(ShopService);
  protected readonly productosService: ProductosService =
    inject(ProductosService);
  protected readonly ordersService: ordersService = inject(ordersService);
  protected readonly promocionesService: PromocionesService =
    inject(PromocionesService);

  user: any = {};
  tienda: any = {};
  Horario_Apertura: any;
  Horario_Cierre: any;
  Descripcion: any;

  selectedProduct: any = null;
  productos: any = [];
  Pedidos: any = [];
  Estado: string = 'Pendiente';

  promociones: any = [];

  selectedFile: File | null = null;
  isloading: Boolean = false;
  editingProduct: any = null;

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
    tipoPromocion: 'porcentaje',
    codigoPromocion: '',
    condiciones: '',
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private viewportScroller: ViewportScroller
  ) {
    this.loadProfile();
  }
  ngOnInit() {
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        setTimeout(() => {
          this.viewportScroller.scrollToAnchor(fragment);
        }, 100);
      }
    });
  }
  scrollTo(fragment: string): void {
    this.viewportScroller.scrollToAnchor(fragment);
  }

  loadProfile(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.getProfile(token).subscribe(
        (profile) => {
          this.user = profile;
          this.loadTienda();
        },
        (error) => {
          console.error('Error al cargar el perfil', error);
          this.onLogout();
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
    this.shopService
      .getProductsByShop(this.tienda.ID_Establecimiento)
      .subscribe(
        (productos) => {
          this.productos = productos;
        },
        (error) => {
          console.error('error al cargar los productos', error);
        }
      );
  }

  secondOportunityLogout() {
    Swal.fire({
      title: '¿Seguro que quieres marcharte?',
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: `Cerrar Sesión`,
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isDenied) {
        this.onLogout();
      }
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }

  updateShopImage(): void {
    if (!this.selectedFile) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, selecciona una imagen.',
      });
      return;
    }

    this.isloading = true;

    this.imageUploadService
      .uploadShopImage(this.selectedFile, this.tienda.ID_Establecimiento)
      .subscribe(
        (response) => {
          this.tienda.foto = response.url;
          Swal.fire({
            icon: 'success',
            title: '¡Imagen Actualizada!',
            text: 'La imagen de la tienda ha sido actualizada correctamente.',
          });
          this.selectedFile = null;
          this.isloading = false;
        },
        (error) => {
          console.error('Error al actualizar la imagen:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un error al actualizar la imagen. Por favor, intenta nuevamente.',
          });
          this.isloading = false;
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
      const horarioData = {
        Horario_Apertura: this.Horario_Apertura,
        Horario_Cierre: this.Horario_Cierre,
        ID_Establecimiento: this.tienda.ID_Establecimiento,
      };

      this.authService.updateHorario(horarioData, token).subscribe(
        (response: any) => {
          Swal.fire({
            icon: 'success',
            title: '¡Horario Actualizado!',
            text: 'El horario ha sido actualizado correctamente.',
          });
          this.loadProfile();
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
    } else {
      this.onLogout();
    }
  }

  onSubmitDescripcion() {
    const token = localStorage.getItem('token');
    if (token) {
      const descripcionData = {
        Descripcion: this.Descripcion,
        ID_Establecimiento: this.tienda.ID_Establecimiento,
      };

      this.authService.updateDescription(descripcionData, token).subscribe(
        (response: any) => {
          Swal.fire({
            icon: 'success',
            title: '¡Descripción Actualizada!',
            text: 'La descripción ha sido actualizada correctamente.',
          });
          this.loadProfile();
        },
        (error: any) => {
          console.error('Error al actualizar la descripción', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un error al actualizar la descripción. Por favor, intenta nuevamente.',
          });
        }
      );
    } else {
      this.onLogout();
    }
  }

  deleteProduct(ID_Producto: any) {
    this.productosService
      .deleteProductoById(ID_Producto, this.tienda.ID_Establecimiento)
      .subscribe(
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
    formData.append(
      'Disponibilidad',
      this.newProduct.Disponibilidad.toString()
    );
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

  getOrders() {
    this.ordersService
      .getOrdersByShopAndState(this.tienda.ID_Establecimiento, this.Estado)
      .subscribe(
        (response: any) => {
          this.Pedidos = response;
          this.Pedidos = response.map((pedido: any) => {
            return {
              ...pedido,
              productos: JSON.parse(pedido.productos),
            };
          });
        },
        (error: any) => {
          console.error('Error al cargar los pedidos', error);
        }
      );
  }

  loadPromotions() {
    this.promocionesService
      .getPromotionsByShop(this.tienda.ID_Establecimiento)
      .subscribe(
        (response: any) => {
          this.promociones = response;
        },
        (error: any) => {
          console.error('Error al cargar las promociones', error);
        }
      );
  }

  addPromotion() {
    this.newPromotion.ID_Establecimiento = this.tienda.ID_Establecimiento;
    this.promocionesService.addPromotion(this.newPromotion).subscribe(
      (response: any) => {
        Swal.fire({
          icon: 'success',
          title: '¡Promoción Añadida!',
          text: 'La promoción ha sido añadida correctamente.',
        });
        this.loadPromotions();
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
        this.loadPromotions();
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

  startEditing(producto: any): void {
    this.editingProduct = { ...producto };
  }

  cancelEditing(): void {
    this.editingProduct = null;
  }

  updateProduct(): void {
    if (!this.editingProduct) {
      return;
    }

    this.isloading = true;

    if (this.selectedFile) {
      this.imageUploadService
        .uploadProductImage(this.selectedFile, this.editingProduct.ID_Producto)
        .subscribe(
          (response) => {
            this.editingProduct.Foto = response.url;
            this.selectedFile = null;
            this.saveProductChanges();
          },
          (error) => {
            console.error('Error al subir la imagen:', error);
            alert('Error al subir la imagen.');
            this.isloading = false;
          }
        );
    } else {
      this.saveProductChanges();
    }
  }

  saveProductChanges(): void {
    this.productosService.updateProducto(this.editingProduct).subscribe(
      (response: any) => {
        Swal.fire({
          icon: 'success',
          title: '¡Producto Actualizado!',
          text: 'El producto ha sido actualizado correctamente.',
        });
        this.loadProductos();
        this.editingProduct = null;
        this.isloading = false;
      },
      (error: any) => {
        console.error('Error al actualizar el producto:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Hubo un error al actualizar el producto. Por favor, intenta nuevamente.',
        });
        this.isloading = false;
      }
    );
  }
}
