import { Component, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { FirestoreFirebaseService } from 'src/app/services/firestore-firebase.service';
import { Iemployee, OverviewService } from 'src/app/services/overview.service';

@Component({
  selector: 'app-admin-overview',
  templateUrl: './admin-overview.component.html',
  styleUrls: ['./admin-overview.component.scss'],
})
export class AdminOverviewComponent implements OnInit {
  @Output() employeeOfTheMonth!: Iemployee;
  constructor(
    private overviewSerivce: OverviewService,
    private firestoreService: FirestoreFirebaseService
  ) {}
  ngOnInit(): void {
    this.overviewSerivce.processShifts().subscribe(async (res) => {
      console.log(res);
      this.employeeOfTheMonth = res.reduce((acc, curr) => {
        return acc.totalShifts > curr.totalShifts ? acc : curr;
      });
      const findName = this.firestoreService
        .getFullname(this.employeeOfTheMonth.uid!)
        .then((resultedName) => {
          this.employeeOfTheMonth!.fullname = String(resultedName);
          console.log(this.employeeOfTheMonth);
          return this.employeeOfTheMonth;
        });
      await findName.then((res) => {
        this.employeeOfTheMonth = res;
      });
    });
  }
}
