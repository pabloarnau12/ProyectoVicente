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
import { PerfilComponent } from './component/perfil/perfil.component';
import { AuthGuard } from './auth/auth.guard'; // Asegúrate de que el guard está configurado

export const routes: Routes = [
    { path: '', redirectTo: '/home',  pathMatch: 'full'},
    { path: 'home', title: 'home',  component: HomeComponent },
    { path: 'catalogo', title: 'catalogo',  component: CatalogoComponent },
    { path: 'contacto', title: 'contacto',  component: ContactoComponent },
    { path: 'iniciarsesion', title: 'iniciar sesion',  component: LoginComponent },
    { path: 'register', title: 'Registrarse',  component: RegisterComponent },
    { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
    { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
    { path: 'catalogo/:nombre', title: 'Pagina Tienda', component: PaginaProductoComponent},
    { path: 'catalogo/:nombre/productos', title: 'Productos de la tienda', component: ProductostiendaComponent},
    { path: '**', component: NotFoundComponent },
    
];

