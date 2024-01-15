import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAbsencesPage } from './add-absences.page';

const routes: Routes = [
  {
    path: '',
    component: AddAbsencesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAbsencesPageRoutingModule {}
