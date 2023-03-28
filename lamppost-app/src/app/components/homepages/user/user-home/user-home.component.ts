import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ishift } from 'src/app/interfaces/ishift';
import { CookiesService } from 'src/app/services/cookies.service';
import { FirestoreFirebaseService } from 'src/app/services/firestore-firebase.service';
import CustomValidators from 'src/app/auth-utils/customValidations';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
})
export class UserHomeComponent implements OnInit {
  addShiftForm!: FormGroup;
  databaseShifts!: Ishift[];
  private UID: string;
  constructor(
    private cookieService: CookiesService,
    private firestoreService: FirestoreFirebaseService
  ) {
    let loggedUserUID = this.cookieService.getTokenCookie();
    this.UID = loggedUserUID.uid;
    this.firestoreService.getUserShifts(this.UID).subscribe((response) => {
      if (response) {
        this.databaseShifts = response!.shifts;
      } else {
        this.databaseShifts = [];
      }
      this.addShiftForm = new FormGroup(
        {
          shiftSlug: new FormControl('', [Validators.required]),
          shiftDate: new FormControl(''),
          shiftStartTime: new FormControl(''),
          shiftEndTime: new FormControl(''),
          shiftWage: new FormControl(''),
          shiftDepartment: new FormControl(''),
          shiftComments: new FormControl(''),
        },
        CustomValidators.duplicateSlug(this.databaseShifts, 'shiftSlug')
      );
    });
  }
  ngOnInit(): void {}

  addShift() {
    this.firestoreService.addShift(this.addShiftForm.value, this.UID);
  }
}
