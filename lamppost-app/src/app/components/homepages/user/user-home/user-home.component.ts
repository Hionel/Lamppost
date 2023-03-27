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
    console.log(this.UID);
    // this.firestoreService.getUserShifts(this.UID).subscribe((shifts) => {
    //   if (shifts.payload.exists) {
    //     this.databaseShifts = shifts.payload.data().shifts;
    //   }
    // });
  }
  ngOnInit(): void {
    this.addShiftForm = new FormGroup({
      shiftSlug: new FormControl('', [Validators.required]),
      shiftDate: new FormControl(''),
      shiftStartTime: new FormControl(''),
      shiftEndTime: new FormControl(''),
      shiftWage: new FormControl(''),
      shiftDepartment: new FormControl(''),
      shiftComments: new FormControl(''),
    });
    if (this.databaseShifts) {
      this.addShiftForm.addValidators([
        CustomValidators.duplicateSlug(this.databaseShifts, 'shiftSlug'),
      ]);
    }

    this.addShiftForm.updateValueAndValidity();
  }

  addShift() {
    this.firestoreService.addShift(this.addShiftForm.value, this.UID);
  }
}
