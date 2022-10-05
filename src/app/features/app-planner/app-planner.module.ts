import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BacklogComponent } from './backlog/backlog.component';



@NgModule({
  declarations: [BacklogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: BacklogComponent
      }
    ])
  ]
})
export class AppPlannerModule { }
