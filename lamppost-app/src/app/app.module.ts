import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { ExtractErrorMessagePipe } from './customPipes/extract-error-message.pipe';
import { DateTimeRemovalPipe } from './customPipes/date-time-removal.pipe';
import { NumberFormatterPipe } from './customPipes/number-formatter.pipe';
import { AbbreviatePipe } from './customPipes/abbreviate.pipe';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

import { AppComponent } from './app.component';
import { AuthPageComponent } from './components/authentication/auth-page/auth-page.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { AdminSignupComponent } from './components/authentication/admin-signup/admin-signup.component';
import { AuthImageComponent } from './components/authentication/auth-image/auth-image.component';
import { UserSignupComponent } from './components/authentication/user-signup/user-signup.component';

import { UserHomeComponent } from './components/homepages/user/user-home/user-home.component';
import { EditShiftOverlayComponent } from './components/homepages/administrator/admin-shifts/edit-shift-overlay/edit-shift-overlay.component';
import { ShiftsTableComponent } from './components/homepages/administrator/admin-shifts/shifts-table/shifts-table.component';
import { UserHeaderComponent } from './components/homepages/user/user-header/user-header.component';

import { AdminHomeComponent } from './components/homepages/administrator/admin-home/admin-home.component';
import { AdminShiftsComponent } from './components/homepages/administrator/admin-shifts/admin-shifts.component';
import { AdminWorkersComponent } from './components/homepages/administrator/admin-workers/admin-workers.component';
import { AdminOverviewComponent } from './components/homepages/administrator/admin-overview/admin-overview.component';
import { AdminHeaderComponent } from './components/homepages/administrator/admin-header/admin-header.component';
import { EditInfoCardComponent } from './components/homepages/administrator/admin-workers/edit-info-card/edit-info-card.component';
import { WorkersTableComponent } from './components/homepages/administrator/admin-workers/workers-table/workers-table.component';
import { ResetPasswordComponent } from './components/authentication/reset-password/reset-password.component';
import { HighestEarningsSummaryDisplayComponent } from './components/homepages/administrator/admin-overview/highest-earnings-summary-display/highest-earnings-summary-display.component';
import { MostShiftsCardComponent } from './components/homepages/administrator/admin-overview/most-shifts-card/most-shifts-card.component';
import { PastShiftsCardComponent } from './components/homepages/administrator/admin-overview/past-shifts-card/past-shifts-card.component';
import { LoaderComponent } from './components/loader/loader.component';
import { UserAddShiftsComponent } from './components/homepages/user/user-shifts/user-add-shifts/user-add-shifts.component';
import { UserOverviewComponent } from './components/homepages/user/user-overview/user-overview.component';
import { UserTableShiftsComponent } from './components/homepages/user/user-shifts/user-table-shifts/user-table-shifts.component';
import { UserProfileComponent } from './components/homepages/user/user-profile/user-profile.component';
import { UserShiftsComponent } from './components/homepages/user/user-shifts/user-shifts.component';
import { UserEditShiftComponent } from './components/homepages/user/user-shifts/user-edit-shift/user-edit-shift.component';
import { UserPastWeeksComponent } from './components/homepages/user/user-overview/user-past-weeks/user-past-weeks.component';
import { UserUpcomingWeekComponent } from './components/homepages/user/user-overview/user-upcoming-week/user-upcoming-week.component';
import { UserHighestEarningsComponent } from './components/homepages/user/user-overview/user-highest-earnings/user-highest-earnings.component';

const materialModules = [
  MatCardModule,
  MatSlideToggleModule,
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
];

const modules = [FormsModule, ReactiveFormsModule];

@NgModule({
  declarations: [
    AbbreviatePipe,
    ExtractErrorMessagePipe,
    DateTimeRemovalPipe,
    NumberFormatterPipe,

    AppComponent,
    AuthPageComponent,
    LoginComponent,
    AdminSignupComponent,
    AuthImageComponent,
    UserSignupComponent,

    UserHomeComponent,
    UserHeaderComponent,
    UserAddShiftsComponent,
    UserOverviewComponent,
    UserShiftsComponent,
    UserTableShiftsComponent,
    UserProfileComponent,

    AdminHomeComponent,
    AdminShiftsComponent,
    AdminWorkersComponent,
    AdminOverviewComponent,
    AdminHeaderComponent,
    EditInfoCardComponent,
    WorkersTableComponent,
    ShiftsTableComponent,
    EditShiftOverlayComponent,
    MostShiftsCardComponent,
    HighestEarningsSummaryDisplayComponent,
    PastShiftsCardComponent,
    LoaderComponent,
    ResetPasswordComponent,
    UserEditShiftComponent,
    UserPastWeeksComponent,
    UserUpcomingWeekComponent,
    UserHighestEarningsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    ...materialModules,
    ...modules,
  ],
  providers: [
    ExtractErrorMessagePipe,
    DateTimeRemovalPipe,
    NumberFormatterPipe,
    AbbreviatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
