import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { ProfileComponent } from './profile/profile/profile.component';

console.log('Dashboard Module');
@NgModule({
  declarations: [
    DashboardPageComponent,
    DashboardComponent,
    DetailPageComponent,
    ProfileComponent,
  ],
  imports: [CommonModule, SharedModule, DashboardRoutingModule],
})
export class DashboardModule {}
