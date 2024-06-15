import { Component } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService
      .login({ username: this.username, password: this.password })
      .subscribe(
        (response) => {
          console.log('Login successful', response);
          // Redirigir al usuario al componente QuienesSomos
          this.router.navigate(['/blogUsuario']);
        },
        (error) => {
          console.error('Login failed', error);
          // Manejar el error de manera más específica aquí
          if (error.status === 401) {
            this.loginError = 'Invalid username or password';
          } else {
            this.loginError = 'An unknown error occurred. Please try again later.';
          }
        }
      );
  }
}
