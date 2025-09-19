// services/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private readonly authTokenKey = 'authToken';
  private readonly username = 'admin';
  private readonly password = 'terciopelo123'; // Cambiar en producción

  constructor(private router: Router) {
    // Verificar si ya está autenticado
    this.isAuthenticated = !!localStorage.getItem(this.authTokenKey);
  }

  login(username: string, password: string): boolean {
    if (username === this.username && password === this.password) {
      const token = btoa(`${username}:${password}`);
      localStorage.setItem(this.authTokenKey, token);
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.authTokenKey);
    this.isAuthenticated = false;
    this.router.navigate(['/admin/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }
}
