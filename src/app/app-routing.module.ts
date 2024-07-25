import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BadgeComponent } from './components/badge/badge.component';
import { DasFactsheetConfigComponent } from './components/das-factsheet-config/das-factsheet-config.component';
import { DataProfileComponent } from './components/data-profile/data-profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  {path: 'main',component: DashboardComponent},
  {path: 'badge',component: BadgeComponent},
  {path: 'das-factsheet-config',component: DasFactsheetConfigComponent},
  {path: 'data-profile',component: DataProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
