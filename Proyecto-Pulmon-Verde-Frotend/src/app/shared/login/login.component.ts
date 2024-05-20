import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: boolean = false;

  constructor(private authService: AuthService) { }

  onSubmit() {
    if (this.authService.authenticate(this.username, this.password)) {
      // Iniciar sesión exitosamente
      this.loginError = false;
      // Navegar a la página de bienvenida
      // Ejemplo: this.router.navigate(['/bienvenida']);
    } else {
      // Mostrar error de inicio de sesión
      this.loginError = true;
    }
  }
}
