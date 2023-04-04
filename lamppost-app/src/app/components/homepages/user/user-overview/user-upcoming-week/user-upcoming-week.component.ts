import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Ishift } from 'src/app/interfaces/ishift';

@Component({
  selector: 'app-user-upcoming-week',
  templateUrl: './user-upcoming-week.component.html',
  styleUrls: ['./user-upcoming-week.component.scss'],
})
export class UserUpcomingWeekComponent {
  displayedColumns: string[] = ['shiftSlug', 'shiftDate'];
  @Input() dataSource: MatTableDataSource<Ishift> =
    new MatTableDataSource<Ishift>();

  constructor() {}
  ngOnInit(): void {}
}
