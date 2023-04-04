import { Component, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Ishift } from 'src/app/interfaces/ishift';
import { CookiesService } from 'src/app/services/cookies.service';
import { UserOverviewService } from 'src/app/services/user-overview.service';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss'],
})
export class UserOverviewComponent implements OnInit {
  @Output() pastWeekShifts!: MatTableDataSource<Ishift>;
  @Output() upcomingWeekShifts!: MatTableDataSource<Ishift>;
  @Output() highestEarningsMonth!: string;
  @Output() highestEarningsValue!: number;
  constructor(private userOverviewService: UserOverviewService) {}
  ngOnInit(): void {
    this.userOverviewService.getBestEarningsMonth().subscribe((res) => {
      if (Object.values(res).some((value) => value > 0)) {
        this.highestEarningsMonth = Object.keys(res).reduce((a, b) =>
          res[a] > res[b] ? a : b
        );
        this.highestEarningsValue = Math.ceil(res[this.highestEarningsMonth]);
      } else {
        return;
      }
    });
    this.userOverviewService.getPastShifts().subscribe((res) => {
      this.pastWeekShifts = new MatTableDataSource<Ishift>(res);
    });

    this.userOverviewService.getUpcomingShifts().subscribe((res) => {
      this.upcomingWeekShifts = new MatTableDataSource<Ishift>(res);
    });
  }
}
