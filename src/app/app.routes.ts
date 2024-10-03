import { Routes } from '@angular/router';
import { HomeComponent } from './component/paginaPrincipal/home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { CatalogoComponent } from './component/tiendas/catalogo/catalogo.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { ContactoComponent } from './component/Contact/contacto/contacto.component';
import { PaginaProductoComponent } from './component/tiendas/pagina-producto/pagina-producto.component';

import { ProductostiendaComponent } from './component/tiendas/productostienda/productostienda.component';
import { LoginComponent } from './component/Session/login/login.component';
import { RegisterComponent } from './component/Session/register/register.component';
import { PerfilComponent } from './component/Session/perfil/perfil.component';
import { AuthGuard } from './auth/auth.guard'; // Asegúrate de que el guard está configurado
import { ProductDetailComponent } from './component/tiendas/product-detail/product-detail.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home',  pathMatch: 'full'},
    { path: 'home', title: 'home',  component: HomeComponent },
    { path: 'catalogo', title: 'catalogo',  component: CatalogoComponent },
    { path: 'contacto', title: 'contacto',  component: ContactoComponent },
    { path: 'iniciarsesion', title: 'iniciar sesion',  component: LoginComponent },
    { path: 'register', title: 'Registrarse',  component: RegisterComponent },
    { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
    { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
    { path: 'catalogo/:id', title: 'Pagina Tienda', component: PaginaProductoComponent},
    { path: 'catalogo/:id/productos', title: 'Productos de la tienda', component: ProductostiendaComponent},
    { path: 'catalogo/:id/productos/:idProducto', title: 'hola', component: ProductDetailComponent},

    { path: '**', component: NotFoundComponent },
    
];

