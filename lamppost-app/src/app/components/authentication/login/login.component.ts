import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationFirebaseService } from 'src/app/services/authentication-firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private authService: AuthenticationFirebaseService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }
  submitLogin() {
    this.authService.loginUser(
      this.loginForm.value.email,
      this.loginForm.value.password
    );
  }
}
