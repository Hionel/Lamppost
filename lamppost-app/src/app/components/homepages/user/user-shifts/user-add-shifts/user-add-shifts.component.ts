import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import CustomValidators from 'src/app/auth-utils/customValidations';
import { AbbreviatePipe } from 'src/app/customPipes/abbreviate.pipe';
import { Ishift } from 'src/app/interfaces/ishift';
import { CookiesService } from 'src/app/services/cookies.service';
import { FirestoreFirebaseService } from 'src/app/services/firestore-firebase.service';

@Component({
  selector: 'app-user-add-shifts',
  templateUrl: './user-add-shifts.component.html',
  styleUrls: ['./user-add-shifts.component.scss'],
})
export class UserAddShiftsComponent {
  addShiftForm!: FormGroup;
  workerNameAbrreviation!: string;
  slugPattern!: RegExp;
  dataBaseShifts!: Ishift[];
  private UID: string;
  constructor(
    private fireStoreService: FirestoreFirebaseService,
    private cookiesService: CookiesService,
    private abbreviatePipe: AbbreviatePipe
  ) {
    let loggedUserToken = this.cookiesService.getTokenCookie();
    this.UID = loggedUserToken.uid;
    this.fireStoreService.getUserShifts(this.UID).subscribe((res) => {
      if (res) {
        this.dataBaseShifts = res!.shifts;
      } else {
        this.dataBaseShifts = [];
      }
      this.fireStoreService.getFullname(this.UID).then((fullname) => {
        this.workerNameAbrreviation = this.abbreviatePipe.transform(
          String(fullname)
        );
        this.addShiftForm
          .get('shiftDepartment')
          ?.valueChanges.subscribe((value) => {
            const shiftSlugValue = `${value}-${this.workerNameAbrreviation}`;
            this.addShiftForm.get('shiftSlug')?.setValue(shiftSlugValue);
            this.slugPattern = new RegExp(`^${shiftSlugValue}-\d+$`);
            this.addShiftForm
              .get('shiftSlug')
              ?.setValidators([
                Validators.required,
                Validators.pattern(this.slugPattern),
              ]);
          });
      });
      this.addShiftForm = new FormGroup(
        {
          shiftSlug: new FormControl('', [Validators.required]),
          shiftDate: new FormControl('', [Validators.required]),
          shiftStartTime: new FormControl('', [Validators.required]),
          shiftEndTime: new FormControl('', [Validators.required]),
          shiftWage: new FormControl('', [Validators.required]),
          shiftDepartment: new FormControl('', [Validators.required]),
          shiftComments: new FormControl(''),
        },
        [
          CustomValidators.duplicateSlug(this.dataBaseShifts, 'shiftSlug'),
          CustomValidators.dateComparison('shiftStartTime', 'shiftEndTime'),
        ]
      );
    });
  }
  addShift() {
    console.log(this.addShiftForm.value);
    this.fireStoreService.addShift(this.addShiftForm.value, this.UID);
  }
}
