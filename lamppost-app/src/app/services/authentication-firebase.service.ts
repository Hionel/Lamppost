import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
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

  loginUser(email: string, password: string) {
    try {
      this.ngFireAuth
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          console.log(res.user?.uid);
          let tokenData: { uid: string; adminAccount?: boolean } = {
            uid: res.user!.uid,
          };

          this.firestoreService
            .getLoggedUserData(res.user!.uid)
            .pipe(take(1))
            .subscribe((res) => {
              if (res.payload.exists) {
                tokenData = {
                  ...tokenData,
                  adminAccount: res.payload.data()!.adminAccount,
                };

                this.cookieService.setTokenCookie(tokenData as StoredUser);
                const adminState = this.cookieService.getTokenCookie();
                if (adminState.adminAccount) {
                  this.router.navigate(['/administrator']);
                } else {
                  this.router.navigate(['/homepage']);
                }
                this.snackbarNotification.openSuccessSnack(
                  'Authentication Successful'
                );
              } else {
                this.snackbarNotification.openErrorSnack(
                  'Authentication Failed'
                );
              }
            });
        })
        .catch((error: any) => {
          if (error.code) {
            const errorMsg = this.extractErrorMsg.transform(error.message);
            return this.snackbarNotification.openErrorSnack(`${errorMsg}`);
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
