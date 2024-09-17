import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { CatalogoComponent } from './component/catalogo/catalogo.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { ContactoComponent } from './component/contacto/contacto.component';
import { PaginaProductoComponent } from './component/pagina-producto/pagina-producto.component';
import { PaginapagoComponent } from './component/paginapago/paginapago.component';
import { ProductostiendaComponent } from './component/productostienda/productostienda.component';
import { PruebaComponent } from './component/prueba/prueba.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';


export const routes: Routes = [
    { path: '', redirectTo: '/home',  pathMatch: 'full'},
    { path: 'home', title: 'home',  component: HomeComponent },
    { path: 'catalogo', title: 'catalogo',  component: CatalogoComponent },
    { path: 'contacto', title: 'contacto',  component: ContactoComponent },
    { path: 'iniciarsesion', title: 'iniciar sesion',  component: LoginComponent },
    { path: 'registrarse', title: 'Registrarse',  component: RegisterComponent },
    { path: ':nombre', title: 'Pagina Tienda', component: PaginaProductoComponent},
    { path: ':nombre/productos', title: 'Productos de la tienda', component: ProductostiendaComponent},
    { path: 'paginapago/:id', title: 'Producto', component: PaginapagoComponent},
    { path: 'productostienda/:id', title: 'ProductosTienda', component: ProductostiendaComponent},
    { path: 'prueba', title: 'PRUEBA', component: PruebaComponent},
    { path: 'prueba/:id', title: 'PRUEBA', component: PruebaComponent},
    { path: '**', component: NotFoundComponent },
    
];

