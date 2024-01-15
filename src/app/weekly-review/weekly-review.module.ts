import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeeklyReviewPageRoutingModule } from './weekly-review-routing.module';

import { WeeklyReviewPage } from './weekly-review.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeeklyReviewPageRoutingModule
  ],
  declarations: [WeeklyReviewPage]
})
export class WeeklyReviewPageModule {}
