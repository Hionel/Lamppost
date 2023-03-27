import { AfterContentChecked, Component, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Ishift } from 'src/app/interfaces/ishift';
import { FirestoreFirebaseService } from 'src/app/services/firestore-firebase.service';
import { LoaderHandlerService } from 'src/app/services/loader-handler.service';
import { Iemployee, OverviewService } from 'src/app/services/overview.service';

@Component({
  selector: 'app-admin-overview',
  templateUrl: './admin-overview.component.html',
  styleUrls: ['./admin-overview.component.scss'],
})
export class AdminOverviewComponent implements OnInit, AfterContentChecked {
  @Output() employeeOfTheMonth!: Iemployee;
  @Output() pastWeekShifts!: MatTableDataSource<Ishift>;
  @Output() highestEarningsMonth!: string;
  @Output() highestEarningsValue!: number;
  noDataMessage: string = 'There are no shifts inside the database';

  constructor(
    private overviewSerivce: OverviewService,
    private firestoreService: FirestoreFirebaseService,
    public loadingHandler: LoaderHandlerService
  ) {
    this.loadingHandler.loading();
  }

  ngOnInit(): void {
    this.overviewSerivce.processWokerWithMostShifts().subscribe((res) => {
      if (res.length > 0) {
        this.employeeOfTheMonth = res.reduce((acc, curr) => {
          return acc.totalShifts > curr.totalShifts ? acc : curr;
        });
      } else {
        return;
      }
    });

    this.overviewSerivce.getCurrentWeeksPastShifts().subscribe((res) => {
      this.pastWeekShifts = new MatTableDataSource<Ishift>(res);
    });

    this.overviewSerivce.getBestEarningsMonth().subscribe((res) => {
      if (Object.values(res).some((value) => value > 0)) {
        let highestMonth = '';
        let highestValue = 0;
        let workersArray = [];
        highestMonth = Object.keys(res).reduce((a, b) =>
          res[a] > res[b] ? a : b
        );
        this.firestoreService.getAllUsersData().subscribe((data) => {
          workersArray = [];
          for (const user of data) {
            if (!user.adminAccount) {
              workersArray.push(user);
            }
          }
          highestValue = Math.ceil(res[highestMonth] / workersArray.length);
          this.highestEarningsValue = highestValue;
          this.highestEarningsMonth = highestMonth;
        });
      } else {
        return;
      }
    });
  }
  ngAfterContentChecked(): void {
    setTimeout(() => {
      this.loadingHandler.finish();
    }, 100);
  }
}
