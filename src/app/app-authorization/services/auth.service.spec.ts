import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import * as moment from 'moment';
import { LocalStorageKeys } from '../constants';
import { AuthenticationResponse, LoginRequest, RegisterRequest } from '../types';
import { RequestMethods } from 'src/app/testing.const';
import { Router, Routes, } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';

describe('AuthService', () => {
    let authService: AuthService;
    let httpTestingController: HttpTestingController;
    let router: Router;
    let req: TestRequest;

    const registerRequestMock: RegisterRequest = {
        username: 'test',
        password: 'test',
        email: 'test@example.com',
        passwordRepeat: 'test'
    };

    const loginRequestMock: LoginRequest = {
        email: 'test@example.com',
        password: 'test'
    };

    const authResponseMock: AuthenticationResponse = {
        token: 'sample_token',
        expiresIn: 3600,
        userId: 'sample_user_id'
    };

    const routes: Routes = [
        { path: 'auth/login', component: LoginComponent },

    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule.withRoutes(routes)
            ],
            providers: [AuthService],
        });

        router = TestBed.inject(Router);

        authService = TestBed.inject(AuthService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
        localStorage.removeItem(LocalStorageKeys.token);
        localStorage.removeItem(LocalStorageKeys.expiresAt);
    });

    it('should be created', () => {
        expect(authService).toBeTruthy();
    });

    describe('registerUser', () => {
        beforeEach(() => {
            authService.registerUser(registerRequestMock).subscribe();
            req = httpTestingController.expectOne('/api/users');
            req.flush(authResponseMock);
        });

        it('should make a POST request to the server with the user data', () => {
            expect(req.request.method).toBe(RequestMethods.POST);
            expect(req.request.body).toEqual(registerRequestMock);
        });
        it('should set token in local storage', () => {
            expect(localStorage.getItem(LocalStorageKeys.token)).toBe(authResponseMock.token);
        });
        it("should set expiration date in local storage", () => {
            const expiresAt = moment().add(authResponseMock.expiresIn, "second");
            expect(localStorage.getItem(LocalStorageKeys.expiresAt)).toBeCloseTo(expiresAt.valueOf(), -5); // 5ms tolerance
        });
    });

    describe('loginUser', () => {
        beforeEach(() => {
            authService.loginUser(loginRequestMock).subscribe();
            req = httpTestingController.expectOne('/api/users/login');
            req.flush(authResponseMock);
        });

        it('should make a POST request to the server with the user data', () => {
            expect(req.request.method).toBe('POST');
            expect(req.request.body).toEqual(loginRequestMock);
        });

        it('should store token in local storage', () => {
            expect(localStorage.getItem(LocalStorageKeys.token)).toBe(authResponseMock.token);
        });

        it('should store expiration date in local storage', () => {
            const expiresAt = moment().add(authResponseMock.expiresIn, 'second');
            expect(localStorage.getItem(LocalStorageKeys.expiresAt)).toBeCloseTo(expiresAt.valueOf(), -5); // 5ms tolerance
        });

        it('should navigate to root after a successful login', () => {
            spyOn(router, 'navigate');
            authService.loginUser(loginRequestMock).subscribe();
            const req = httpTestingController.expectOne('/api/users/login');
            req.flush(authResponseMock);
            expect(router.navigate).toHaveBeenCalledWith(['/']);
        });
    });

    describe('logout', () => {
        beforeEach(() => {
            localStorage.setItem(LocalStorageKeys.token, 'sample_token');
            localStorage.setItem(LocalStorageKeys.expiresAt, 'sample_expires_at');
            authService.logout();
        });

        it('should remove token from local storage', () => {
            expect(localStorage.getItem(LocalStorageKeys.token)).toBeNull();
        });

        it('should remove expiration date from local storage', () => {
            expect(localStorage.getItem(LocalStorageKeys.expiresAt)).toBeNull();
        });
    });
    describe('isLoggedIn', () => {
        it('should return true if the current time is before the expiration date', () => {
          const expirationDate = moment().add(1, 'day');
          spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(expirationDate.valueOf()));
          
          const result = authService.isLoggedIn();
    
          expect(result).toBe(true);
        });
    
        it('should return false if the current time is after the expiration date', () => {
          const expirationDate = moment().subtract(1, 'day');
          spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(expirationDate.valueOf()));
          
          const result = authService.isLoggedIn();
    
          expect(result).toBe(false);
        });
    
        it('should return false if the expiration date is not set', () => {
          spyOn(localStorage, 'getItem').and.returnValue(null);
          
          const result = authService.isLoggedIn();
    
          expect(result).toBe(false);
        });
      });
    
});