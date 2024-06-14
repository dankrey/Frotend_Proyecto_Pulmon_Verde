import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly username = 'usuario';
  private readonly password = 'contraseña';

  authenticate(username: string, password: string): boolean {
    return username === this.username && password === this.password;
  }
}

