import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotfoundComponent } from './core/components/notfound/notfound.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './modules/auth/login/login.component';
import { SignupComponent } from './modules/auth/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
