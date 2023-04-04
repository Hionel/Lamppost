import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import CustomValidators from 'src/app/auth-utils/customValidations';
import PasswordVisibilityToogler from 'src/app/auth-utils/passwordVisibilityToogler';
import { AuthenticationFirebaseService } from 'src/app/services/authentication-firebase.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.scss'],
})
export class UserSignupComponent {
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
  userRegister = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),

      password: new FormControl('', [
        Validators.required,
        Validators.pattern(this.passwordRegex),
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
      firstname: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      age: new FormControl('', [
        Validators.required,
        Validators.min(18),
        Validators.max(65),
      ]),
      adminAccount: new FormControl(false),
    },
    [CustomValidators.matchPasswords('password', 'confirmPassword')]
  );

  // Registration event
  submitForm() {
    this.authService.signupUser(this.userRegister);
  }
}
