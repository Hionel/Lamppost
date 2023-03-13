import {
  AfterViewChecked,
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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
  selector: 'app-edit-info-card',
  templateUrl: './edit-info-card.component.html',
  styleUrls: ['./edit-info-card.component.scss'],
})
export class EditInfoCardComponent {
  @Input() selectedUserData!: StoredUser | undefined;
  showDeleteButton: boolean = true;
  cardTransform: string = '';
  editUserForm: FormGroup;
  constructor(
    private firestoreService: FirestoreFirebaseService,
    private ngFireAuth: AngularFireAuth
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
  }
  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['selectedUserData'] &&
      !changes['selectedUserData'].firstChange
    ) {
      console.log(this.selectedUserData);
      this.addDataToEditForm(this.selectedUserData!);
      this.cardTransform = 'rotateY(-0.5turn)';
    }
  }
  closeCard(form: FormGroup, formDirective: FormGroupDirective) {
    this.cardTransform = '';
    form.reset();
    formDirective.resetForm();
    for (const control in form.controls) {
      form.get(control)?.setErrors(null);
    }
    if (!this.showDeleteButton) {
      setTimeout(() => {
        this.showDeleteButton = true;
      }, 1500);
    }
  }
  deleteUserData(form: FormGroup, formDirective: FormGroupDirective) {
    if (this.selectedUserData) {
      this.firestoreService.deleteUserData(this.selectedUserData.uid!);
      this.closeCard(form, formDirective);
    }
  }
  updateUserData(editedUserData: FormGroup, formDirective: FormGroupDirective) {
    this.firestoreService.updateUserData(
      this.selectedUserData!.uid!,
      editedUserData.value
    );

    this.closeCard(editedUserData, formDirective);
  }
  editAdminProfile() {
    this.cardTransform = 'rotateY(-0.5turn)';
    this.ngFireAuth.user.subscribe((data) => {
      const uid = data?.uid;
      this.firestoreService.getLoggedUserData(uid!).subscribe((res) => {
        this.selectedUserData = {
          uid: res.payload.id,
          ...res.payload.data()!,
        };
        console.log(this.selectedUserData);
        this.addDataToEditForm(this.selectedUserData!);
        this.showDeleteButton = false;
      });
    });
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
