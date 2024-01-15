import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectConstructionAreaPage } from './select-construction-area.page';

const routes: Routes = [
  {
    path: '',
    component: SelectConstructionAreaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectConstructionAreaPageRoutingModule {}
