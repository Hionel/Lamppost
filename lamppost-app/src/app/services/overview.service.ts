import { Injectable } from '@angular/core';
import { Subject, take } from 'rxjs';
import { Ishift } from '../interfaces/ishift';
import { AllShiftsService } from './all-shifts.service';
import { FirestoreFirebaseService } from './firestore-firebase.service';

export type MonthsObj = {
  [key: string]: number;
  January: number;
  February: number;
  March: number;
  April: number;
  May: number;
  June: number;
  July: number;
  August: number;
  September: number;
  October: number;
  November: number;
  December: number;
};

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
  employeeCardDataObject: Iemployee = {
    fullname: '',
    totalShifts: 0,
  };
  employeesArray: Iemployee[] = new Array<Iemployee>();
  pastShifts: Ishift[] = new Array<Ishift>();

  constructor(
    private firestoreService: FirestoreFirebaseService,
    private allShiftsService: AllShiftsService
  ) {}
  getShiftsObject() {
    return this.firestoreService.getAllShifts();
  }

  processWokerWithMostShifts() {
    let subjectMostShiftsArray = new Subject<Iemployee[]>();
    this.getShiftsObject().subscribe(async (res) => {
      this.employeesArray = [];
      for (const userObject of res) {
        let responseUserObject = await userObject;
        this.employeeCardDataObject = {
          uid: '',
          fullname: '',
          totalShifts: 0,
          month: '',
        };

        if (responseUserObject.shifts.length > 0) {
          this.employeeCardDataObject.uid = responseUserObject.shiftsUID;
          this.employeeCardDataObject.fullname = responseUserObject.fullname!;
          for (const shift of responseUserObject.shifts) {
            const shiftMonth = new Date(shift.shiftDate).getMonth() + 1;
            if (shiftMonth === this.currentMonth) {
              this.employeeCardDataObject.totalShifts += 1;
            }
            const monthName = new Date(0, this.currentMonth - 1).toLocaleString(
              'en-us',
              { month: 'long' }
            );
            this.employeeCardDataObject.month = monthName;
          }
          this.employeesArray.push(this.employeeCardDataObject);
        } else {
          return;
        }
        subjectMostShiftsArray.next(this.employeesArray);
      }
      return subjectMostShiftsArray.asObservable();
    });
    return subjectMostShiftsArray;
  }

  getCurrentWeeksPastShifts() {
    let subjectPastShiftsArray = new Subject<Ishift[]>();
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const startOfWeek = currentDate.getDate() - currentDate.getDay() + 1;
    const endOfWeek = currentDate.getDate() + 6;
    const endOfWeekLimit =
      currentDate.getDate() < endOfWeek ? currentDate.getDate() : endOfWeek;
    this.getShiftsObject().subscribe(async (res) => {
      this.pastShifts = [];
      for (const userObject of res) {
        const responseUserObject = await userObject;
        if (responseUserObject.shifts.length > 0) {
          for (const shift of responseUserObject.shifts) {
            const shiftDateDay = new Date(shift.shiftDate).getDate();
            const shiftMonth = new Date(shift.shiftDate).getMonth() + 1;
            const shiftYear = new Date(shift.shiftDate).getFullYear();
            if (
              shiftDateDay >= startOfWeek &&
              shiftDateDay <= endOfWeekLimit &&
              shiftMonth === this.currentMonth &&
              shiftYear === currentYear
            ) {
              shift.fullname = responseUserObject.fullname;
              this.pastShifts.push(shift);
            }
          }
        } else {
          return;
        }
        subjectPastShiftsArray.next(this.pastShifts);
      }
      return subjectPastShiftsArray.asObservable();
    });
    return subjectPastShiftsArray;
  }

  getBestEarningsMonth() {
    let subjectSummaryData = new Subject<MonthsObj>();
    this.getShiftsObject().subscribe(async (res) => {
      const monthsObj: MonthsObj = {
        January: 0,
        February: 0,
        March: 0,
        April: 0,
        May: 0,
        July: 0,
        June: 0,
        August: 0,
        September: 0,
        October: 0,
        November: 0,
        December: 0,
      };
      for (const userObject of res) {
        const responseUserObject = await userObject;

        if (responseUserObject.shifts.length > 0) {
          Object.entries(monthsObj).map(([key, value], index) => {
            let monthTotal = 0;
            for (const shift of responseUserObject.shifts) {
              shift.totalEarnings =
                this.allShiftsService.calculateTotalPerShift(
                  shift.shiftStartTime,
                  shift.shiftEndTime,
                  shift.shiftWage
                );
              if (new Date(shift.shiftDate).getMonth() === index) {
                monthTotal += shift.totalEarnings;
                value = monthTotal;
                monthsObj[key] = monthTotal;
              }
            }
          });
        } else {
          return;
        }
        subjectSummaryData.next(monthsObj);
      }
      return subjectSummaryData.asObservable();
    });
    return subjectSummaryData;
  }
}
