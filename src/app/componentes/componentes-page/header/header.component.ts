import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  nomeUsuario: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private router: Router, private _snackBar: MatSnackBar) {}

  isAuthenticated(): boolean {

    if (typeof localStorage !== 'undefined') {
      return !!localStorage.getItem('token');
    } else {
      return false;
    }
  }

  navegarParaNotaLista() {
    this.router.navigate(['/processo-lista']);
  }

  criarAnotacao() {
    this.router.navigate(['/processo-create']);
  }

  registrarUsuario() {
    this.router.navigate(['/register']);
  }

  loginUsuario() {
    this.router.navigate(['/login']);
  }

  logout(): void {
    // Limpar LocalStorage
    localStorage.clear();
    // Redirecionar para a página inicial

    this._snackBar.open('Deslogando o usuário!', '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });

    this.router.navigate(['/']); // ou para o caminho correto da página inicial
  }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      const nomeLocalStorage = localStorage.getItem('nome');
      this.nomeUsuario = nomeLocalStorage !== null ? nomeLocalStorage : '';
      console.log(this.nomeUsuario);
    } else {
      this.nomeUsuario = '';
    }
  }
}
