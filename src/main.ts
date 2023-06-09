import {enableProdMode, importProvidersFrom } from '@angular/core';

import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { ROUTES } from './app/routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { authInterceptor } from './app/app-authorization/interceptors/auth-interceptor';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { effects, reducers } from './app/state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(ROUTES),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore(reducers),
    provideEffects(effects),
    importProvidersFrom(
      !environment.production ? StoreDevtoolsModule.instrument() : [],
    )
  ]
});