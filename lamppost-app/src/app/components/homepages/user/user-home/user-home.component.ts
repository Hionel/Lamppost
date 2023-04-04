import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ishift } from 'src/app/interfaces/ishift';
import { CookiesService } from 'src/app/services/cookies.service';
import { FirestoreFirebaseService } from 'src/app/services/firestore-firebase.service';
import CustomValidators from 'src/app/auth-utils/customValidations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
})
export class UserHomeComponent {
  @Output() fullname!: string;
  addShiftForm!: FormGroup;
  databaseShifts!: Ishift[];
  private UID: string;
  constructor(
    private cookieService: CookiesService,
    private firestoreService: FirestoreFirebaseService,
    private router: Router
  ) {
    let loggedUserUID = this.cookieService.getTokenCookie();
    this.UID = loggedUserUID.uid;
    this.firestoreService.getFullname(this.UID).then((data) => {
      this.fullname = String(data);
    });
    this.router.navigate(['/homepage/overview']);
  }
}
