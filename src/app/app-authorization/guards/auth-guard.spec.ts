import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from './auth-guard';
import { HttpClientModule } from '@angular/common/http';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      providers: [AuthGuard, AuthService],
    });

    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should allow access if user is logged in', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);

    const result = authGuard.canActivate();

    expect(result).toBe(true);
    expect(authService.isLoggedIn).toHaveBeenCalled();
  });

  it('should navigate to login page and deny access if user is not logged in', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(false);
    spyOn(router, 'navigate');

    const result = authGuard.canActivate();

    expect(result).toBe(false);
    expect(authService.isLoggedIn).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
  });
});
