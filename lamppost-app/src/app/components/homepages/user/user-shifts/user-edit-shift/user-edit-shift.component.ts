import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import CustomValidators from 'src/app/auth-utils/customValidations';
import { Ishift } from 'src/app/interfaces/ishift';
import { FirestoreFirebaseService } from 'src/app/services/firestore-firebase.service';

@Component({
  selector: 'app-user-edit-shift',
  templateUrl: './user-edit-shift.component.html',
  styleUrls: ['./user-edit-shift.component.scss'],
})
export class UserEditShiftComponent {
  editShiftForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Ishift,
    private firestoreSerivce: FirestoreFirebaseService
  ) {
    console.log(data);
    this.editShiftForm = new FormGroup(
      {
        shiftDepartment: new FormControl(this.data.shiftDepartment),
        shiftDate: new FormControl(this.data.shiftDate, [Validators.required]),
        shiftStartTime: new FormControl(this.data.shiftStartTime, [
          Validators.required,
        ]),
        shiftEndTime: new FormControl(this.data.shiftEndTime, [
          Validators.required,
        ]),
        shiftWage: new FormControl(this.data.shiftWage, [
          Validators.required,
          Validators.min(1),
        ]),
      },
      CustomValidators.dateComparison('shiftStartTime', 'shiftEndTime')
    );
  }
  updateShiftData(form: FormGroup, formDirective: FormGroupDirective) {
    this.firestoreSerivce.updateShift(
      this.data.uid!,
      this.data.shiftSlug!,
      form.value
    );
    form.reset();
    formDirective.resetForm();
  }

  deleteShiftData() {
    this.firestoreSerivce.deleteShift(this.data.uid!, this.data.shiftSlug!);
  }
}
