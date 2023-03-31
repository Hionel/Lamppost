import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthPageComponent } from './components/authentication/auth-page/auth-page.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { AdminSignupComponent } from './components/authentication/admin-signup/admin-signup.component';
import { UserSignupComponent } from './components/authentication/user-signup/user-signup.component';

import { AdminHomeComponent } from './components/homepages/administrator/admin-home/admin-home.component';
import { AdminOverviewComponent } from './components/homepages/administrator/admin-overview/admin-overview.component';
import { AdminShiftsComponent } from './components/homepages/administrator/admin-shifts/admin-shifts.component';
import { EditShiftOverlayComponent } from './components/homepages/administrator/admin-shifts/edit-shift-overlay/edit-shift-overlay.component';
import { AdminWorkersComponent } from './components/homepages/administrator/admin-workers/admin-workers.component';

import { UserHomeComponent } from './components/homepages/user/user-home/user-home.component';
import { UserOverviewComponent } from './components/homepages/user/user-overview/user-overview.component';
import { UserProfileComponent } from './components/homepages/user/user-profile/user-profile.component';
import { UserAddShiftsComponent } from './components/homepages/user/user-shifts/user-add-shifts/user-add-shifts.component';
import { UserShiftsComponent } from './components/homepages/user/user-shifts/user-shifts.component';
import { UserTableShiftsComponent } from './components/homepages/user/user-shifts/user-table-shifts/user-table-shifts.component';

import { AccessGuard } from './guards/access.guard';
import { AuthGuard } from './guards/auth.guard';
import { MasterGuard } from './guards/master.guard';
import { ResetPasswordComponent } from './components/authentication/reset-password/reset-password.component';
import { UserEditShiftComponent } from './components/homepages/user/user-shifts/user-edit-shift/user-edit-shift.component';

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
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
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
            children: [
              {
                path: ':shiftID',
                component: UserEditShiftComponent,
              },
            ],
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
    canActivate: [AuthGuard, MasterGuard],
    children: [
      {
        path: 'overview',
        component: AdminOverviewComponent,
        canActivate: [AuthGuard, MasterGuard],
      },
      {
        path: 'shifts',
        component: AdminShiftsComponent,
        canActivate: [AuthGuard, MasterGuard],

        children: [
          {
            path: ':shiftID',
            component: EditShiftOverlayComponent,
            canActivate: [AuthGuard, MasterGuard],
          },
        ],
      },
      {
        path: 'employees',
        component: AdminWorkersComponent,
        canActivate: [AuthGuard, MasterGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
