import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeeklyReviewPage } from './weekly-review.page';

const routes: Routes = [
  {
    path: '',
    component: WeeklyReviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeeklyReviewPageRoutingModule {}
