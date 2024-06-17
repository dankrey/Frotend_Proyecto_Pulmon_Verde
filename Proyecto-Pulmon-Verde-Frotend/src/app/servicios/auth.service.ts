import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

interface LoginRequest {
  username: string;
  password: string;
}

interface RegisterRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  username: string;
  // Añade aquí cualquier otra propiedad que tu servidor devuelva
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';
  private loggedIn = false;
  private userName: string = '';

  constructor(private http: HttpClient) {}

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginRequest).pipe(
      tap(response => {
        this.loggedIn = true;
        this.userName = response.username;
      })
    );
  }

  register(registerRequest: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, registerRequest);
  }

  logout(): void {
    this.loggedIn = false;
    this.userName = '';
  }

  isLoggedIn(): Observable<boolean> {
    return of(this.loggedIn); // Utiliza 'of' correctamente importado desde 'rxjs'
  }

  getUserName(): string {
    return this.userName;
  }
}