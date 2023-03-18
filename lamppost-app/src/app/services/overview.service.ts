import { Injectable } from '@angular/core';
import { Observable, Subject, take } from 'rxjs';
import { FirestoreFirebaseService } from './firestore-firebase.service';

export interface Iemployee {
  uid?: string;
  fullname?: string;
  totalShifts: number;
  month?: string;
}

@Injectable({
  providedIn: 'root',
})
export class OverviewService {
  currentMonth = new Date().getMonth() + 1;
  employeeObject: Iemployee = {
    fullname: '',
    totalShifts: 0,
  };
  employeeOfTheMonth?: Iemployee;
  validationArray: Iemployee[] = new Array<Iemployee>();
  constructor(private firestoreService: FirestoreFirebaseService) {}
  getShiftsObject() {
    return this.firestoreService.getAllShifts();
  }

  processShifts() {
    let subjectObservable = new Subject<Iemployee[]>();
    this.getShiftsObject()
      .pipe(take(1))
      .subscribe((res) => {
        console.log(res);
        for (let userObject of res) {
          this.employeeObject = {
            uid: '',
            fullname: '',
            totalShifts: 0,
            month: '',
          };

          if (userObject.shifts.length > 0) {
            for (const shift of userObject.shifts) {
              const shiftMonth = new Date(shift.shiftDate).getMonth() + 1;
              if (shiftMonth === this.currentMonth) {
                this.employeeObject.totalShifts += 1;
              }
              const monthName = new Date(
                0,
                this.currentMonth - 1
              ).toLocaleString('en-us', { month: 'long' });
              this.employeeObject.month = monthName;
              this.employeeObject.uid = userObject.shiftsUID;
            }
            this.validationArray.push(this.employeeObject);
          }
        }
        subjectObservable.next(this.validationArray);
        return subjectObservable.asObservable();
      });
    return subjectObservable;
  }
}
