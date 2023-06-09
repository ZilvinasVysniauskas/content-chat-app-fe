import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { fetchUserProfile } from 'src/app/state/actions/user-actions';

@Injectable({ providedIn: 'root' })
export class OAuth2RedirectGuard {

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    this.authService.storeToken(route.queryParams['token']);
    if (this.authService.getToken()) {
      this.store.dispatch(fetchUserProfile())
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/login']);
    }
    return false;
  }
}