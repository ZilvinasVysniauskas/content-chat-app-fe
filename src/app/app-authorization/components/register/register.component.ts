import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { InputNames } from '../../constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule
  ]
})
export class RegisterComponent {
  
  registerForm: FormGroup = this.formBuilder.group({
    [InputNames.email]: ['', [Validators.required, Validators.email]],
    [InputNames.password]: ['', [Validators.required]],
    [InputNames.passwordRepeat]: ['', Validators.required],
    [InputNames.username]: ['', [Validators.required]],
  });

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  onSubmit(): void {
    this.authService.registerUser(this.registerForm.value).subscribe();
  }

}

