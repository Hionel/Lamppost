import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Ishift } from 'src/app/interfaces/ishift';
import { AllShiftsService } from 'src/app/services/all-shifts.service';
import { FirestoreFirebaseService } from 'src/app/services/firestore-firebase.service';
import { SnackbarNotificationService } from 'src/app/services/snackbar-notification.service';

@Component({
  selector: 'app-shifts-table',
  templateUrl: './shifts-table.component.html',
  styleUrls: ['./shifts-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShiftsTableComponent implements OnInit {
  displayedColumns: string[] = [
    'fullname',
    'shiftDate',
    'shiftStartTime',
    'shiftEndTime',
    'shiftWage',
    'shiftDepartment',
    'totalEarnings',
  ];
  shiftsData: Ishift[] = [];
  dataSource = new MatTableDataSource<Ishift>();
  @Output() selectedShift: EventEmitter<Ishift> = new EventEmitter<Ishift>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  searchFormGroup: FormGroup;
  constructor(
    private firestoreSerivce: FirestoreFirebaseService,
    private shiftsService: AllShiftsService,
    private snackbar: SnackbarNotificationService
  ) {
    this.searchFormGroup = new FormGroup({
      byName: new FormControl(''),
      byDepartment: new FormControl(''),
      filterStartDate: new FormControl(''),
      filterEndDate: new FormControl(''),
    });

    this.filterListener();
  }
  ngOnInit(): void {
    this.getShifts();
  }

  filterListener() {
    this.searchFormGroup.valueChanges.subscribe((res: any) => {
      const filter = JSON.stringify({
        ...res,
      });
      this.dataSource.filter = filter;
    });
  }
  createFilterOption(): (data: Ishift, filter: string) => boolean {
    let filterFunc = this.shiftsService.filterFunc;
    return filterFunc;
  }
  onDateRangePickerClosed() {
    if (!this.searchFormGroup.get('filterEndDate')!.value) {
      this.clearDateRange();
      this.snackbar.openErrorSnack('Please select both date values!');
    }
  }
  clearDateRange() {
    this.shiftsService.clearDateInputs(
      this.searchFormGroup,
      'filterStartDate',
      'filterEndDate'
    );
  }

  selectShiftFromTable(shift: Ishift) {
    this.selectedShift.emit(shift);
  }

  getShifts() {
    this.firestoreSerivce.getAllShifts().subscribe(async (response) => {
      this.shiftsData = [];
      for (let data of response) {
        const result = await data;
        if (result.shifts.length > 0) {
          let shiftInfo: Ishift;
          let totalEarnings: number;
          for (const shift of result.shifts) {
            totalEarnings = this.shiftsService.calculateTotalPerShift(
              shift.shiftStartTime,
              shift.shiftEndTime,
              shift.shiftWage
            );
            shiftInfo = {
              uid: result.shiftsUID,
              fullname: result.fullname,
              ...shift,
              totalEarnings: totalEarnings,
            };
            this.shiftsData.push(shiftInfo);
          }
          this.dataSource = new MatTableDataSource(this.shiftsData);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataSource.filterPredicate = this.createFilterOption();
        }
      }
    });
  }
}
