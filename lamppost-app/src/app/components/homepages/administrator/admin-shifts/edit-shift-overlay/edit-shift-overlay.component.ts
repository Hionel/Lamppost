import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ishift } from 'src/app/interfaces/ishift';
import { FirestoreFirebaseService } from 'src/app/services/firestore-firebase.service';

@Component({
  selector: 'app-edit-shift-overlay',
  templateUrl: './edit-shift-overlay.component.html',
  styleUrls: ['./edit-shift-overlay.component.scss'],
})
export class EditShiftOverlayComponent {
  editShiftForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Ishift,
    private firestoreSerivce: FirestoreFirebaseService
  ) {
    this.editShiftForm = new FormGroup({
      fullname: new FormControl(this.data.fullname),
      shiftDate: new FormControl(this.data.shiftDate, [Validators.required]),
      shiftStartTime: new FormControl(this.data.shiftStartTime, [
        Validators.required,
      ]),
      shiftEndTime: new FormControl(this.data.shiftEndTime, [
        Validators.required,
      ]),
      shiftWage: new FormControl(this.data.shiftWage, [Validators.required]),
      shiftDepartment: new FormControl(this.data.shiftDepartment, [
        Validators.required,
      ]),
    });
  }
  updateShiftData(form: FormGroup, formDirective: FormGroupDirective) {
    this.firestoreSerivce.updateShift(
      this.data.uid!,
      this.data.shiftSlug,
      form.value
    );
    form.reset();
    formDirective.resetForm();
  }

  deleteShiftData() {
    this.firestoreSerivce.deleteShift(this.data.uid!, this.data.shiftSlug);
  }
}
