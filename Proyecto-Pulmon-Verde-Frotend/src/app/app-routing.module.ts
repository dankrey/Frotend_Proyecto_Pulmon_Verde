import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { LoginComponent } from './shared/login/login.component';
import { BlogComponent } from './shared/blog/blog.component';
import { ContactoComponent } from './shared/contacto/contacto.component';
import { QuienesSomosComponent } from './shared/quienes-somos/quienes-somos.component';
import { RegisterComponent } from './shared/register/register.component';


const routes: Routes = [{path:'',redirectTo: 'home',  pathMatch: 'full'},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'blog',component:BlogComponent},
  {path:'contacto',component:ContactoComponent},
  {path:'QuienesSomos',component:QuienesSomosComponent},
  {path:'Register',component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
