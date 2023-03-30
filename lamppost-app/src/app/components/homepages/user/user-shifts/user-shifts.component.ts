import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-user-shifts',
  templateUrl: './user-shifts.component.html',
  styleUrls: ['./user-shifts.component.scss'],
})
export class UserShiftsComponent {}
