import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ExtractErrorMessagePipe } from '../customPipes/extract-error-message.pipe';
import { StoredUser } from '../interfaces/stored-user';
import { CookiesService } from './cookies.service';
import { FirestoreFirebaseService } from './firestore-firebase.service';
import { SnackbarNotificationService } from './snackbar-notification.service';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationFirebaseService {
  constructor(
    private ngFireAuth: AngularFireAuth,
    private snackbarNotification: SnackbarNotificationService,
    private firestoreService: FirestoreFirebaseService,
    private extractErrorMsg: ExtractErrorMessagePipe,
    private router: Router,
    private cookieService: CookiesService
  ) {}

  async signupUser(user: FormGroup) {
    const userData = user.value;
    try {
      const res = await this.ngFireAuth.createUserWithEmailAndPassword(
        userData.email,
        userData.password
      );
      res.user!.sendEmailVerification();
      this.firestoreService.createUserDocument(res.user!.uid, userData);
      this.snackbarNotification.openSuccessSnack('Registration Successful');
      return this.loginUser(userData.email, userData.password);
    } catch (error: any) {
      if (error.code) {
        const errorMsg = this.extractErrorMsg.transform(error.message);
        return this.snackbarNotification.openErrorSnack(`${errorMsg}`);
      }
    }
  }

  async loginUser(email: string, password: string) {
    try {
      const res = await this.ngFireAuth.signInWithEmailAndPassword(
        email,
        password
      );
      let userData = { uid: res.user!.uid };
      this.snackbarNotification.openSuccessSnack('Authentication Successful');
      this.firestoreService
        .getLoggedUserData(res.user!.uid)
        .subscribe((res) => {
          userData = { ...userData, ...res.payload.data()! };
          this.cookieService.setTokenCookie(userData as StoredUser);
          const adminState = this.cookieService.getTokenCookie();
          if (adminState.adminAccount) {
            this.router.navigate(['/administrator']);
          } else {
            this.router.navigate(['/homepage']);
          }
        });
    } catch (error: any) {
      if (error) {
        if (error.code) {
          const errorMsg = this.extractErrorMsg.transform(error.message);
          return this.snackbarNotification.openErrorSnack(`${errorMsg}`);
        }
      }
    }
  }
}
