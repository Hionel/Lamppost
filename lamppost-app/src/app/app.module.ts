import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExtractErrorMessagePipe } from './customPipes/extract-error-message.pipe';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { AuthPageComponent } from './components/authentication/auth-page/auth-page.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { AdminSignupComponent } from './components/authentication/admin-signup/admin-signup.component';
import { AuthImageComponent } from './components/authentication/auth-image/auth-image.component';
import { UserSignupComponent } from './components/authentication/user-signup/user-signup.component';
import { UserHomeComponent } from './components/homepages/user/user-home/user-home.component';
import { AdminHomeComponent } from './components/homepages/administrator/admin-home/admin-home.component';

const materialModules = [
  MatCardModule,
  MatSlideToggleModule,
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatSnackBarModule,
];
const modules = [FormsModule, ReactiveFormsModule];

@NgModule({
  declarations: [
    ExtractErrorMessagePipe,
    AppComponent,
    AuthPageComponent,
    LoginComponent,
    AdminSignupComponent,
    AuthImageComponent,
    UserSignupComponent,
    UserHomeComponent,
    AdminHomeComponent,
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
  providers: [ExtractErrorMessagePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
