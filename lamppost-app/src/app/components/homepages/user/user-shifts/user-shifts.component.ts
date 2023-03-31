import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-shifts',
  templateUrl: './user-shifts.component.html',
  styleUrls: ['./user-shifts.component.scss'],
})
export class UserShiftsComponent {
  constructor(private router: Router) {
    this.router.navigate(['/homepage/shifts/add-shift']);
  }
}
