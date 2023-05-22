import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { AuthenticationResponse, LoginRequest, RegisterRequest } from '../types';
import * as moment from "moment";
import { LocalStorageKeys } from '../constants';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user: RegisterRequest) {
    return this.http.post<AuthenticationResponse>('/api/auth/register', user).pipe(
      tap((res) => {
        this.setSession(res);
        this.router.navigate(['/']);
      })
    );
  }

  loginUser(user: LoginRequest) {
    return this.http.post<AuthenticationResponse>('/api/auth/login', user).pipe(
      tap((res) => {
        this.setSession(res);
        this.router.navigate(['/']);
      }));
  }


  logout() {
    localStorage.removeItem(LocalStorageKeys.token);
    localStorage.removeItem(LocalStorageKeys.expiresAt);
    localStorage.removeItem(LocalStorageKeys.userId);
    this.router.navigate(['/auth/login']);
  }
  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  private getExpiration() {
    const expiration = localStorage.getItem(LocalStorageKeys.expiresAt);
    return expiration ? moment(JSON.parse(expiration)) : null;
  }

  private setSession(authResult: AuthenticationResponse) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');
    localStorage.setItem(LocalStorageKeys.token, authResult.token);
    localStorage.setItem(LocalStorageKeys.expiresAt, JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem(LocalStorageKeys.userId, authResult.userId);
  }

}
