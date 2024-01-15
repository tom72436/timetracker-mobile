import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAbsencesPageRoutingModule } from './add-absences-routing.module';

import { AddAbsencesPage } from './add-absences.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAbsencesPageRoutingModule
  ],
  declarations: [AddAbsencesPage]
})
export class AddAbsencesPageModule {}
