import { Component } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    this.authService
      .register({ username: this.username, password: this.password })
      .subscribe(
        (response) => {
          console.log('Registraccion exitosa.', response);
          // Redirige a la página de login después del registro exitoso
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Fallo de Registro.', error);
        }
      );
  }
}


