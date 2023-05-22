import { enableProdMode, importProvidersFrom } from '@angular/core';

import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { ROUTES } from './app/routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { SocketIoModule } from 'ngx-socket-io';
import { authInterceptor } from './app/app-authorization/interceptors/auth-interceptor';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(ROUTES), 
    provideHttpClient( withInterceptors([authInterceptor]) ),

    importProvidersFrom(
      SocketIoModule.forRoot({ url: 'http://localhost:3000', options: { transports: ['websocket']} }),
    ),
  ]
});