import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: 'calendar',
        loadChildren: () => import('./features/app-calendar/app-calendar.module').then(m => m.AppCalendarModule)
      },
      {
        path: 'planner',
        loadChildren: () => import('./features/app-planner/app-planner.module').then(m => m.AppPlannerModule)
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
