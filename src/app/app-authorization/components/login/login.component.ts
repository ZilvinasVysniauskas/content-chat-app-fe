import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { InputNames } from '../../constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule
  ]
})
export class LoginComponent {
  loginForm: FormGroup = this.formBuilder.group({
    [InputNames.email]: ['', [Validators.required, Validators.email]],
    [InputNames.password]: ['', [Validators.required]],
  });

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.loginUser({
        email: this.loginForm.value[InputNames.email],
        password: this.loginForm.value[InputNames.password]
      }).subscribe();
    }
  }
}
