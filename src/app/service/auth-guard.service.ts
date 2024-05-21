import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {

    // Verifica se o usuário está autenticado
    const isAuthenticated = !!localStorage.getItem('token');

    if (isAuthenticated) {
      return true; // Permite o acesso à rota
    } else {
      // Redireciona o usuário para a página de login se não estiver autenticado
      this.router.navigate(['/login']);
      return false;
    }
  }
}
