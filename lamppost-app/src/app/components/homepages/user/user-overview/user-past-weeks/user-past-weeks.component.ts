import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Ishift } from 'src/app/interfaces/ishift';

@Component({
  selector: 'app-user-past-weeks',
  templateUrl: './user-past-weeks.component.html',
  styleUrls: ['./user-past-weeks.component.scss'],
})
export class UserPastWeeksComponent {
  displayedColumns: string[] = ['shiftSlug', 'shiftDate'];
  @Input() dataSource: MatTableDataSource<Ishift> =
    new MatTableDataSource<Ishift>();

  constructor() {}
  ngOnInit(): void {}
}
