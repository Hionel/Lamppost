import { Component, OnInit, Output } from '@angular/core';
import { Subject, take } from 'rxjs';
import { Ishift } from 'src/app/interfaces/ishift';
import { FirestoreFirebaseService } from 'src/app/services/firestore-firebase.service';
import {
  Iemployee,
  MonthsObj,
  OverviewService,
} from 'src/app/services/overview.service';

@Component({
  selector: 'app-admin-overview',
  templateUrl: './admin-overview.component.html',
  styleUrls: ['./admin-overview.component.scss'],
})
export class AdminOverviewComponent implements OnInit {
  @Output() employeeOfTheMonth!: Iemployee;
  @Output() pastWeekShifts!: Ishift[];
  @Output() highesEarningsMonth!: string;
  @Output() highesEarningsValue!: number;
  constructor(
    private overviewSerivce: OverviewService,
    private firestoreService: FirestoreFirebaseService
  ) {}
  ngOnInit(): void {
    this.overviewSerivce.processWokerWithMostShifts().subscribe(async (res) => {
      this.employeeOfTheMonth = res.reduce((acc, curr) => {
        return acc.totalShifts > curr.totalShifts ? acc : curr;
      });
      const findName = this.firestoreService
        .getFullname(this.employeeOfTheMonth.uid!)
        .then((resultedName) => {
          this.employeeOfTheMonth!.fullname = String(resultedName);
          return this.employeeOfTheMonth;
        });
      await findName.then((res) => {
        this.employeeOfTheMonth = res;
      });
    });
    this.overviewSerivce.getCurrentWeeksPastShifts().subscribe((res) => {
      this.pastWeekShifts = res;
    });

    this.overviewSerivce.getBestEarningsMonth().subscribe((res) => {
      let highestEarningMonth = Object.keys(res).reduce((a, b) =>
        res[a] > res[b] ? a : b
      );
      this.firestoreService
        .getAllUsersData()
        .pipe(take(1))
        .subscribe((data) => {
          this.highesEarningsValue = res[highestEarningMonth] / data.length;
        });
      this.highesEarningsMonth = highestEarningMonth;
    });
  }
}
