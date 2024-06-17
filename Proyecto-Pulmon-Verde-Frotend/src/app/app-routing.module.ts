import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { LoginComponent } from './shared/login/login.component';
import { BlogComponent } from './shared/blog/blog.component';
import { ContactoComponent } from './shared/contacto/contacto.component';
import { QuienesSomosComponent } from './shared/quienes-somos/quienes-somos.component';
import { RegisterComponent } from './shared/register/register.component';
import { MapaComponent } from './shared/mapa/mapa.component';
import { HomeUsuarioComponent } from './shared/home-usuario/home-usuario.component';
import { BlogusuarioComponent } from './components/blogusuario/blogusuario.component';
import { ComentariosComponent } from './servicios/ComentarioService/components/comentarios/comentarios.component';
import { InformeComponetComponent } from './components/Informeserivicio/informe-componet/informe-componet.component';
import { InformesComponent } from './shared/informes/informes.component';

const routes: Routes = [{path:'',redirectTo: 'home',  pathMatch: 'full'},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'blog',component:BlogComponent},
  {path:'contacto',component:ContactoComponent},
  {path:'QuienesSomos',component:QuienesSomosComponent},
  {path:'register',component:RegisterComponent},
  {path:'Mapa',component:MapaComponent},
  {path:'homeUsuario',component:HomeUsuarioComponent},
  {path:'blogUsuario',component: BlogusuarioComponent},
  {path:'comentarios',component: ComentariosComponent},
  {path:'informes',component: InformeComponetComponent},
  {path:'informespaginaweb',component: InformesComponent},

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
