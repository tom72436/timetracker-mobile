import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectConstructionAreaPageRoutingModule } from './select-construction-area-routing.module';

import { SelectConstructionAreaPage } from './select-construction-area.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectConstructionAreaPageRoutingModule
  ],
  declarations: [SelectConstructionAreaPage]
})
export class SelectConstructionAreaPageModule {}
