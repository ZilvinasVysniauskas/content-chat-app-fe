import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RegisterComponent } from './register.component';
import { AuthService } from '../../services/auth.service';
import { InputNames } from '../../constants';
import { of } from 'rxjs';
import { AuthenticationResponse } from '../../types';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule, RegisterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('registerForm', () => {
    it('should initialize the register form with empty fields', () => {
      const emailControl = component.registerForm.get(InputNames.email);
      const passwordControl = component.registerForm.get(InputNames.password);
      const passwordRepeatControl = component.registerForm.get(InputNames.passwordRepeat);
      const usernameControl = component.registerForm.get(InputNames.username);

      expect(emailControl?.value).toBe('');
      expect(passwordControl?.value).toBe('');
      expect(passwordRepeatControl?.value).toBe('');
      expect(usernameControl?.value).toBe('');
    });

    describe('emailControl', () => {
      it('should mark email control as invalid when email is empty', () => {
        const emailControl = component.registerForm.get(InputNames.email);
        emailControl?.setValue('');
        emailControl?.markAsTouched();

        expect(emailControl?.invalid).toBe(true);
      });
      it('should mark email control as valid when email is valid', () => {
        const emailControl = component.registerForm.get(InputNames.email);
        emailControl?.setValue('valid@email.com');
        emailControl?.markAsTouched();

        expect(emailControl?.valid).toBe(true);

    });

    describe('passwordRepeatControl', () => {
      it('should mark passwordRepeat control as invalid when passwordRepeat is empty', () => {
        const passwordRepeatControl = component.registerForm.get(InputNames.passwordRepeat);
        passwordRepeatControl?.setValue('');
        passwordRepeatControl?.markAsTouched();

        expect(passwordRepeatControl?.invalid).toBe(true);
      });
    });

    describe('usernameControl', () => {
      it('should mark username control as invalid when username is empty', () => {
        const usernameControl = component.registerForm.get(InputNames.username);
        usernameControl?.setValue('');
        usernameControl?.markAsTouched();

        expect(usernameControl?.invalid).toBe(true);
      });

      it('should mark username control as valid when username is valid', () => {
        const usernameControl = component.registerForm.get(InputNames.username);
        usernameControl?.setValue('testuser');
        usernameControl?.markAsTouched();

        expect(usernameControl?.valid).toBe(true);
      });
    });
  });
  describe('onSubmit', () => {
    it('should call authService.registerUser with form value', () => {
      const authServiceSpy = spyOn(authService, 'registerUser').and.returnValue(of( {} as AuthenticationResponse));

      const formValue = {
        [InputNames.email]: 'test@example.com',
        [InputNames.password]: 'password123',
        [InputNames.passwordRepeat]: 'password123',
        [InputNames.username]: 'testUser'
      };
      component.registerForm.patchValue(formValue);
      component.onSubmit();

      expect(authServiceSpy).toHaveBeenCalledWith(component.registerForm.value);
    });
  });


  });

});