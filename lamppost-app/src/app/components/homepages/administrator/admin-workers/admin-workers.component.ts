import {
  AfterViewChecked,
  Component,
  ComponentRef,
  ElementRef,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { StoredUser } from 'src/app/interfaces/stored-user';
import { FirestoreFirebaseService } from 'src/app/services/firestore-firebase.service';

@Component({
  selector: 'app-admin-workers',
  templateUrl: './admin-workers.component.html',
  styleUrls: ['./admin-workers.component.scss'],
})
export class AdminWorkersComponent {
  selectedUserData?: StoredUser;
  onSelectUser(userData: StoredUser) {
    this.selectedUserData = userData;
  }
}
