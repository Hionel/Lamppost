import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SnackbarNotificationService } from './snackbar-notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationFirebaseService {
  userLoggedIn!: boolean;

  constructor(
    private ngFireAuth: AngularFireAuth,
    private snackbarNotification: SnackbarNotificationService
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

  async signupUser(user: any): Promise<any> {
    try {
      const res = await this.ngFireAuth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
      res.user?.sendEmailVerification();
    } catch (error) {
      console.log('Signup error:', error);
      if (error) {
        return { isValid: false };
      }
      return;
    }
  }

  async loginUser(email: string, passowrd: string): Promise<any> {
    try {
      const res = await this.ngFireAuth.signInWithEmailAndPassword(
        email,
        passowrd
      );
      this.snackbarNotification.openSnackBar('Authentication Successful');
      sessionStorage.setItem('loggedUser', JSON.stringify(res.user!.uid));
    } catch (error) {
      if (error) {
        console.log(error);
        this.snackbarNotification.openSnackBar(
          'Authentication credentials are invalid'
        );
        return { isValid: false };
      }
      return;
    }
  }
}
