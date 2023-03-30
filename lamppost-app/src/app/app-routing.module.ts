import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSignupComponent } from './components/authentication/admin-signup/admin-signup.component';
import { AuthPageComponent } from './components/authentication/auth-page/auth-page.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { UserSignupComponent } from './components/authentication/user-signup/user-signup.component';
import { AdminHomeComponent } from './components/homepages/administrator/admin-home/admin-home.component';
import { AdminOverviewComponent } from './components/homepages/administrator/admin-overview/admin-overview.component';
import { AdminShiftsComponent } from './components/homepages/administrator/admin-shifts/admin-shifts.component';
import { AdminWorkersComponent } from './components/homepages/administrator/admin-workers/admin-workers.component';
import { UserHomeComponent } from './components/homepages/user/user-home/user-home.component';
import { UserOverviewComponent } from './components/homepages/user/user-overview/user-overview.component';
import { UserProfileComponent } from './components/homepages/user/user-profile/user-profile.component';
import { UserAddShiftsComponent } from './components/homepages/user/user-shifts/user-add-shifts/user-add-shifts.component';
import { UserShiftsComponent } from './components/homepages/user/user-shifts/user-shifts.component';
import { UserTableShiftsComponent } from './components/homepages/user/user-shifts/user-table-shifts/user-table-shifts.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'authentication/login',
  },
  {
    path: 'authentication',
    component: AuthPageComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'administrator-signup',
        component: AdminSignupComponent,
      },
      {
        path: 'registration',
        component: UserSignupComponent,
      },
    ],
  },
  {
    path: 'homepage',
    component: UserHomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'overview',
        component: UserOverviewComponent,
      },
      {
        path: 'shifts',
        component: UserShiftsComponent,
        children: [
          {
            path: 'add-shift',
            component: UserAddShiftsComponent,
          },
          {
            path: 'table',
            component: UserTableShiftsComponent,
          },
        ],
      },
      {
        path: 'profile',
        component: UserProfileComponent,
      },
    ],
  },
  {
    path: 'administrator',
    component: AdminHomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'overview',
        component: AdminOverviewComponent,
      },
      { path: 'shifts', component: AdminShiftsComponent },
      { path: 'employees', component: AdminWorkersComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
