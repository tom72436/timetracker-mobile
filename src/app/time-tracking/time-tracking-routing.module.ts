import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimeTrackingPage } from './time-tracking.page';

const routes: Routes = [
  {
    path: '',
    component: TimeTrackingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimeTrackingPageRoutingModule {}
