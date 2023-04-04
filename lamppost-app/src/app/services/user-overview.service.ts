import { Injectable } from '@angular/core';
import { AllShiftsService } from './all-shifts.service';
import { Subject } from 'rxjs';
import { MonthsObj } from './overview.service';
import { CookiesService } from './cookies.service';
import { FirestoreFirebaseService } from './firestore-firebase.service';
import { Ishift } from '../interfaces/ishift';

@Injectable({
  providedIn: 'root',
})
export class UserOverviewService {
  UID: string;
  pastShifts: Ishift[] = new Array<Ishift>();
  upcomingShifts: Ishift[] = new Array<Ishift>();
  currentDate = new Date();
  currentMonth = new Date().getMonth() + 1;
  currentYear = this.currentDate.getFullYear();
  startOfWeek = this.currentDate.getDate() - this.currentDate.getDay() + 1;
  startOfNextWeek = this.currentDate.getDate() - this.currentDate.getDay() + 8;
  endOfNextWeek = this.currentDate.getDate() + 12;
  endOfWeek = this.currentDate.getDate() + 6;
  endOfWeekLimit =
    this.currentDate.getDate() < this.endOfWeek
      ? this.currentDate.getDate()
      : this.endOfWeek;

  constructor(
    private allShiftsService: AllShiftsService,
    private cookiesService: CookiesService,
    private firestoreService: FirestoreFirebaseService
  ) {
    const token = this.cookiesService.getTokenCookie();
    this.UID = token.uid;
  }
  getShiftsObject() {
    return this.firestoreService.getUserShifts(this.UID);
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
      if (res) {
        Object.entries(monthsObj).forEach(async ([key, value], index) => {
          for (const shift of res.shifts) {
            if (new Date(shift.shiftDate).getMonth() === index) {
              shift.totalEarnings =
                this.allShiftsService.calculateTotalPerShift(
                  shift.shiftStartTime,
                  shift.shiftEndTime,
                  shift.shiftWage
                );
              monthsObj[key] += shift.totalEarnings;
            }
          }
        });
        subjectSummaryData.next(monthsObj);
      }
      return subjectSummaryData.asObservable();
    });
    return subjectSummaryData;
  }
  getPastShifts() {
    let subjectPastShiftsArray = new Subject<Ishift[]>();

    this.getShiftsObject().subscribe(async (res) => {
      this.pastShifts = [];
      if (res) {
        for (const shift of res.shifts) {
          const shiftDateDay = new Date(shift.shiftDate).getDate();
          const shiftMonth = new Date(shift.shiftDate).getMonth() + 1;
          const shiftYear = new Date(shift.shiftDate).getFullYear();
          if (
            shiftDateDay >= this.startOfWeek &&
            shiftDateDay <= this.endOfWeekLimit &&
            shiftMonth === this.currentMonth &&
            shiftYear === this.currentYear
          ) {
            this.pastShifts.push(shift);
          }
        }
        subjectPastShiftsArray.next(this.pastShifts);
      } else {
        return;
      }
      return subjectPastShiftsArray.asObservable();
    });
    return subjectPastShiftsArray;
  }

  getUpcomingShifts() {
    let subjectUpcomingShiftsArray = new Subject<Ishift[]>();

    this.getShiftsObject().subscribe(async (res) => {
      this.upcomingShifts = [];
      console.log('-------');
      console.log(this.startOfNextWeek);
      console.log(this.endOfNextWeek);
      if (res) {
        for (const shift of res.shifts) {
          const shiftDateDay = new Date(shift.shiftDate).getDate();
          const shiftMonth = new Date(shift.shiftDate).getMonth() + 1;
          const shiftYear = new Date(shift.shiftDate).getFullYear();
          if (
            shiftDateDay >= this.startOfNextWeek &&
            shiftDateDay <= this.endOfNextWeek &&
            shiftMonth === this.currentMonth &&
            shiftYear === this.currentYear
          ) {
            console.log(shift);
            this.upcomingShifts.push(shift);
          }
        }
        subjectUpcomingShiftsArray.next(this.upcomingShifts);
      } else {
        return;
      }
      return subjectUpcomingShiftsArray.asObservable();
    });
    return subjectUpcomingShiftsArray;
  }
}
