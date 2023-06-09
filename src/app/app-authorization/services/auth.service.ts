import { Injectable } from '@angular/core';
import { LocalStorageKeys } from '../constants';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  logout() {
    localStorage.removeItem(LocalStorageKeys.token);
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return Boolean(this.getToken());
  }

  storeToken(token: string) {
    if (token) {
      localStorage.setItem(LocalStorageKeys.token, token);
    }
  }

  getToken(): string | null {
    return localStorage.getItem(LocalStorageKeys.token);
  }

}
