import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup } from '@angular/forms';
import { ExtractErrorMessagePipe } from '../customPipes/extract-error-message.pipe';
import { FirestoreFirebaseService } from './firestore-firebase.service';
import { SnackbarNotificationService } from './snackbar-notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationFirebaseService {
  userLoggedIn!: boolean;

  constructor(
    private ngFireAuth: AngularFireAuth,
    private snackbarNotification: SnackbarNotificationService,
    private firestoreService: FirestoreFirebaseService,
    private extractErrorMsg: ExtractErrorMessagePipe
  ) {
    this.userLoggedIn = false;
    this.ngFireAuth.onAuthStateChanged((user) => {
      if (user) {
        this.userLoggedIn = true;
      } else {
        this.userLoggedIn = false;
      }
    });
  }

  async signupUser(user: FormGroup) {
    const userData = user.value;
    console.log(userData);
    try {
      const res = await this.ngFireAuth.createUserWithEmailAndPassword(
        userData.email,
        userData.password
      );
      res.user!.sendEmailVerification();
      this.firestoreService.createUserCollection(res.user!.uid, userData);
      this.snackbarNotification.openSnackBar('Admin Registration Successful');
      return;
    } catch (error: any) {
      if (error.code) {
        const errorMsg = this.extractErrorMsg.transform(error.message);
        return this.snackbarNotification.openSnackBar(`${errorMsg}`);
      }
    }
  }

  async loginUser(email: string, password: string) {
    try {
      const res = await this.ngFireAuth.signInWithEmailAndPassword(
        email,
        password
      );
      this.snackbarNotification.openSnackBar('Authentication Successful');
      return sessionStorage.setItem(
        'loggedUser',
        JSON.stringify(res.user!.uid)
      );
    } catch (error: any) {
      if (error) {
        if (error.code) {
          const errorMsg = this.extractErrorMsg.transform(error.message);
          return this.snackbarNotification.openSnackBar(`${errorMsg}`);
        }
      }
    }
  }
}
