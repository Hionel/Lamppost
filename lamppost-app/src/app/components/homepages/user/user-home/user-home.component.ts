import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CookiesService } from 'src/app/services/cookies.service';
import { FirestoreFirebaseService } from 'src/app/services/firestore-firebase.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
})
export class UserHomeComponent {
  addShiftForm: FormGroup;
  private UID: string;
  constructor(
    private cookieService: CookiesService,
    private firestoreService: FirestoreFirebaseService
  ) {
    this.addShiftForm = new FormGroup({
      shiftSlug: new FormControl(''),
      shiftDate: new FormControl(''),
      shiftStartTime: new FormControl(''),
      shiftEndTime: new FormControl(''),
      shiftWage: new FormControl(''),
      shiftDepartment: new FormControl(''),
      shiftComments: new FormControl(''),
    });
    let loggedUserUID = this.cookieService.getTokenCookie();
    this.UID = loggedUserUID.uid;
  }
  addShift() {
    this.firestoreService.addShift(this.addShiftForm.value, this.UID);
  }
}
