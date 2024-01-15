import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'select-construction-area',
    loadChildren: () => import('./select-construction-area/select-construction-area.module').then( m => m.SelectConstructionAreaPageModule)
  },
  {
    path: 'time-tracking',
    loadChildren: () => import('./time-tracking/time-tracking.module').then( m => m.TimeTrackingPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'weekly-review',
    loadChildren: () => import('./weekly-review/weekly-review.module').then( m => m.WeeklyReviewPageModule)
  },
  {
    path: 'absences',
    loadChildren: () => import('./absences/absences.module').then( m => m.AbsencesPageModule)
  },
  {
    path: 'images',
    loadChildren: () => import('./images/images.module').then( m => m.ImagesPageModule)
  },
  {
    path: 'add-absences',
    loadChildren: () => import('./add-absences/add-absences.module').then( m => m.AddAbsencesPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
