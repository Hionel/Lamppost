import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import CustomValidators from 'src/app/auth-utils/customValidations';
import PasswordVisibilityToogler from 'src/app/auth-utils/passwordVisibilityToogler';
import { AuthenticationFirebaseService } from 'src/app/services/authentication-firebase.service';

@Component({
  selector: 'app-admin-signup',
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.scss'],
})
export class AdminSignupComponent {
  constructor(private authService: AuthenticationFirebaseService) {}
  // Regex pattern for pass
  passwordRegex = new RegExp(
    '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])'
  );

  // Password visibility controler
  public registerPasswordsVisibility: boolean = false;
  public confirmPasswordsVisibility: boolean = false;
  public tooglePasswordVisibility(field: string, visibilityStatus: boolean) {
    if (field === 'password') {
      this.registerPasswordsVisibility =
        PasswordVisibilityToogler.tooglePasswordVisibility(
          field,
          visibilityStatus
        );
    }
    if (field === 'confirmPassword') {
      this.confirmPasswordsVisibility =
        PasswordVisibilityToogler.tooglePasswordVisibility(
          field,
          visibilityStatus
        );
    }
  }

  // Form group and controls
  adminRegister = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),

      password: new FormControl('', [
        Validators.required,
        Validators.pattern(this.passwordRegex),
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      age: new FormControl('', [
        Validators.required,
        Validators.min(18),
        Validators.max(65),
      ]),
      adminAccount: new FormControl(true),
    },
    [CustomValidators.matchPasswords('password', 'confirmPassword')]
  );

  // Registration event
  submitForm() {
    this.authService.signupUser(this.adminRegister);
  }
}
