import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { StoredUser } from 'src/app/interfaces/stored-user';
import { CookiesService } from 'src/app/services/cookies.service';
import { FirestoreFirebaseService } from 'src/app/services/firestore-firebase.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  editUserForm: FormGroup;
  loggedUserData!: StoredUser;
  private UID: string;
  constructor(
    private firestoreService: FirestoreFirebaseService,
    private cookieSerivce: CookiesService
  ) {
    this.editUserForm = new FormGroup({
      email: new FormControl(''),
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
    });
    const token = this.cookieSerivce.getTokenCookie();
    this.UID = token.uid;
    this.firestoreService.getLoggedUserData(this.UID).subscribe((res) => {
      this.loggedUserData = { uid: res.payload.id, ...res.payload.data()! };
      this.addDataToEditForm(this.loggedUserData);
    });
  }
  updateUserData(editedUserData: FormGroup, formDirective: FormGroupDirective) {
    this.firestoreService.updateUserData(
      this.loggedUserData.uid!,
      editedUserData.value
    );
  }
  addDataToEditForm(data: StoredUser) {
    this.editUserForm.setValue({
      email: data.email,
      firstname: data.firstname,
      lastname: data.lastname,
      age: data.age,
    });
  }
}
