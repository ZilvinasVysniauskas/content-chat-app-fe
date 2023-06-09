import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
})
export class LoginComponent {
  loginUrl = environment.baseURL + '/oauth2/authorize/google?redirect_uri=' + environment.redirectURL;
}
