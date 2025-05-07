import { Routes } from '@angular/router';
import { HomeComponent } from './component/paginaPrincipal/home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { CatalogoComponent } from './component/tiendas/catalogo/catalogo.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { ContactoComponent } from './component/Contact/contacto/contacto.component';
import { PaginaProductoComponent } from './component/tiendas/pagina-tienda/pagina-producto.component';

import { ProductostiendaComponent } from './component/tiendas/productostienda/productostienda.component';
import { LoginComponent } from './component/Session/login/login.component';
import { RegisterComponent } from './component/Session/register/register.component';
import { PerfilComponent } from './component/Session/perfil/perfil.component';
import { authGuard } from './auth/auth.guard';
import { ProductDetailComponent } from './component/tiendas/product-detail/product-detail.component';
import { TramitarPagosComponent } from './component/tramitar-pagos/tramitar-pagos.component';

export const routes: Routes = [
  { path: 'home', title: 'home', component: HomeComponent },
  { path: 'catalogo', title: 'catalogo', component: CatalogoComponent },
  { path: 'contacto', title: 'contacto', component: ContactoComponent },
  { path: 'iniciarsesion', title: 'iniciar sesion', component: LoginComponent },
  { path: 'register', title: 'Registrarse', component: RegisterComponent },
  { path: 'login', component: LoginComponent, canActivate: [authGuard] },
  { path: 'perfil', component: PerfilComponent, canActivate: [authGuard] },
  {
    path: 'catalogo/:id',
    title: 'Pagina Tienda',
    component: PaginaProductoComponent,
  },
  {
    path: 'catalogo/:id/productos',
    title: 'Productos de la tienda',
    component: ProductostiendaComponent,
  },
  {
    path: 'catalogo/:id/productos/:idProducto',
    title: 'Detalle del producto',
    component: ProductDetailComponent,
  },
  {
    path: 'payment',
    title: 'Pagina de Pago',
    component: TramitarPagosComponent,
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
