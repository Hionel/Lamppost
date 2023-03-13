import { Component, OnInit } from '@angular/core';
import { IshiftObject } from 'src/app/interfaces/ishift';
import { FirestoreFirebaseService } from 'src/app/services/firestore-firebase.service';

@Component({
  selector: 'app-admin-shifts',
  templateUrl: './admin-shifts.component.html',
  styleUrls: ['./admin-shifts.component.scss'],
})
export class AdminShiftsComponent implements OnInit {
  constructor(private firestoreSerivce: FirestoreFirebaseService) {}
  ngOnInit(): void {}
}
