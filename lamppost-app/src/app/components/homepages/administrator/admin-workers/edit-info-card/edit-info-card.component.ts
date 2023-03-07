import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-info-card',
  templateUrl: './edit-info-card.component.html',
  styleUrls: ['./edit-info-card.component.scss'],
})
export class EditInfoCardComponent {
  editUserForm: FormGroup;
  constructor() {
    this.editUserForm = new FormGroup({
      email: new FormControl('', Validators.required),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
    });
  }
}
