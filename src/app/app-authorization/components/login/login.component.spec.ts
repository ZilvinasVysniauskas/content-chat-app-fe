import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { InputNames } from '../../constants';
import { AuthService } from '../../services/auth.service';
import { AuthenticationResponse } from '../../types';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;


  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, HttpClientModule],
      providers: [AuthService]
    })
    .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('loginForm', () => {

    it('should initialize the login form with empty email and password', () => {
      const emailControl = component.loginForm.get(InputNames.email);
      const passwordControl = component.loginForm.get(InputNames.password);

      expect(emailControl?.value).toBe('');
      expect(passwordControl?.value).toBe('');
    });

    describe('emailControl', () => {
      it('should mark email control as invalid when email is empty', () => {
        const emailControl = component.loginForm.get(InputNames.email);
        emailControl?.setValue('');
        emailControl?.markAsTouched();

        expect(emailControl?.invalid).toBe(true);
      });

      it('should mark email control as valid when email is valid', () => {
        const emailControl = component.loginForm.get(InputNames.email);
        emailControl?.setValue('test@example.com');
        emailControl?.markAsTouched();

        expect(emailControl?.valid).toBe(true);
      });

    });

    describe('passwordControl', () => {
      it('should mark password control as invalid when password is empty', () => {
        const passwordControl = component.loginForm.get(InputNames.password);
        passwordControl?.setValue('');
        passwordControl?.markAsTouched();

        expect(passwordControl?.invalid).toBe(true);
      });

      it('should mark password control as valid when password is valid', () => {
        const passwordControl = component.loginForm.get(InputNames.password);
        passwordControl?.setValue('password123');
        passwordControl?.markAsTouched();

        expect(passwordControl?.valid).toBe(true);
      });
    });
  });

  describe('onSubmit', () => {
        it('should call authService.loginUser when form is valid and submitted', () => {
      const email = 'test@example.com';
      const password = 'password123';
      const authServiceSpy = spyOn(authService, 'loginUser').and.returnValue(of( {} as AuthenticationResponse));

      component.loginForm.patchValue({
        [InputNames.email]: email,
        [InputNames.password]: password
      });
      component.onSubmit();

      expect(authServiceSpy).toHaveBeenCalledWith(component.loginForm.value);
    });

    it('should not call authService.loginUser when form is invalid and submitted', () => {
      const authServiceSpy = spyOn(authService, 'loginUser');

      component.onSubmit();

      expect(authServiceSpy).not.toHaveBeenCalled();
    });

  });

});

 




