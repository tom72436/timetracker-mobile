import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimeTrackingPageRoutingModule } from './time-tracking-routing.module';

import { TimeTrackingPage } from './time-tracking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimeTrackingPageRoutingModule
  ],
  declarations: [TimeTrackingPage]
})
export class TimeTrackingPageModule {}
