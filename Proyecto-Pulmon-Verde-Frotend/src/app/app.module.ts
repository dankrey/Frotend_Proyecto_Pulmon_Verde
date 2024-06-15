import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './shared/login/login.component';
import { HomeComponent } from './shared/home/home.component';
import { BlogComponent } from './shared/blog/blog.component';
import { ContactoComponent } from './shared/contacto/contacto.component';
import { QuienesSomosComponent } from './shared/quienes-somos/quienes-somos.component';
import { RegisterComponent } from './shared/register/register.component';
import { MapaComponent } from './shared/mapa/mapa.component';
import { ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule,provideHttpClient, withFetch} from '@angular/common/http';
import { HomeUsuarioComponent } from './shared/home-usuario/home-usuario.component';
import { BlogusuarioComponent } from './components/blogusuario/blogusuario.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    BlogComponent,
    ContactoComponent,
    QuienesSomosComponent,
    RegisterComponent,
    MapaComponent,
    HomeUsuarioComponent,
    BlogusuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
