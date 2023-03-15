import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
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
})
export class ShiftsTableComponent {
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

  // @Input() modificationsDone: boolean = false;
  searchFormGroup: FormGroup;
  constructor(
    private firestoreSerivce: FirestoreFirebaseService,
    private shiftsService: AllShiftsService,
    private snackbar: SnackbarNotificationService
  ) {
    this.getShifts();
    this.searchFormGroup = new FormGroup({
      byName: new FormControl(''),
      byDepartment: new FormControl(''),
      filterStartDate: new FormControl(''),
      filterEndDate: new FormControl(''),
    });

    this.filterListener();
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
    this.firestoreSerivce.getAllShifts().subscribe((response) => {
      this.shiftsData = [];
      response.forEach((data) => {
        let shiftInfo: Ishift;
        let totalEarnings: number;
        let fullname: string;
        this.firestoreSerivce.getFullname(data.shiftsUID).then((workerName) => {
          fullname = String(workerName);
          data.shifts.forEach((shift) => {
            totalEarnings = this.shiftsService.calculateTotalPerShift(
              shift.shiftStartTime,
              shift.shiftEndTime,
              shift.shiftWage
            );
            shiftInfo = {
              uid: data.shiftsUID,
              fullname: fullname,
              ...shift,
              totalEarnings: totalEarnings,
            };
            this.shiftsData.push(shiftInfo);
          });
          this.dataSource = new MatTableDataSource(this.shiftsData);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataSource.filterPredicate = this.createFilterOption();
        });
      });
    });
  }
}
