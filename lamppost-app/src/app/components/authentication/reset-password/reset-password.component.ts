import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import CustomValidators from 'src/app/auth-utils/customValidations';
import PasswordVisibilityToogler from 'src/app/auth-utils/passwordVisibilityToogler';
import { AuthenticationFirebaseService } from 'src/app/services/authentication-firebase.service';
import { FirestoreFirebaseService } from 'src/app/services/firestore-firebase.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  resetPassForm: FormGroup;

  constructor(private authService: AuthenticationFirebaseService) {
    this.resetPassForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  resetFormSubmit() {
    this.authService.resetPassword(this.resetPassForm.value.email);
  }
}
