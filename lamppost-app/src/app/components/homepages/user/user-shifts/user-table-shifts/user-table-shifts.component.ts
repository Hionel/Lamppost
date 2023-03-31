import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Ishift } from 'src/app/interfaces/ishift';
import { FirestoreFirebaseService } from 'src/app/services/firestore-firebase.service';
import { CookiesService } from 'src/app/services/cookies.service';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl, FormGroup } from '@angular/forms';
import { AllShiftsService } from 'src/app/services/all-shifts.service';
import { SnackbarNotificationService } from 'src/app/services/snackbar-notification.service';
import { Router } from '@angular/router';
import { UserEditShiftComponent } from '../user-edit-shift/user-edit-shift.component';

@Component({
  selector: 'app-user-table-shifts',
  templateUrl: './user-table-shifts.component.html',
  styleUrls: ['./user-table-shifts.component.scss'],
})
export class UserTableShiftsComponent implements OnInit {
  displayedColumns: string[] = [
    'shiftDate',
    'shiftStartTime',
    'shiftEndTime',
    'shiftWage',
    'shiftDepartment',
    'totalEarnings',
  ];
  UID: string = '';
  shiftsData: Ishift[] = [];
  searchForm: FormGroup;
  dataSource = new MatTableDataSource<Ishift>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Output() selectedShift: EventEmitter<Ishift> = new EventEmitter<Ishift>();
  constructor(
    private matDialog: MatDialog,
    private router: Router,
    private snackbar: SnackbarNotificationService,
    private shiftService: AllShiftsService,
    private firestoreService: FirestoreFirebaseService,
    private cookieService: CookiesService
  ) {
    this.searchForm = new FormGroup({
      byDepartment: new FormControl(''),
      filterStartDate: new FormControl(''),
      filterEndDate: new FormControl(''),
    });
    const Token = this.cookieService.getTokenCookie();
    this.UID = Token.uid;
    this.filterListener();
  }
  ngOnInit(): void {
    this.getShifts(this.UID);
  }
  selectShift(shift: Ishift) {
    console.log(shift.shiftSlug);
    this.router.navigate([
      `/homepage/shifts/table/edit-shift:${shift.shiftSlug}`,
    ]);
    const dialogRef = this.matDialog.open(UserEditShiftComponent, {
      data: shift,
      height: 'fit-content',
      width: '35%',
      hasBackdrop: true,
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.router.navigate(['/homepage/shifts/table']);
    });
  }
  getShifts(userUID: string) {
    this.firestoreService.getUserShifts(userUID).subscribe((res) => {
      if (res) {
        this.shiftsData = [];
        let shiftInfo: Ishift;
        let totalEarnings: number;
        for (const shift of res.shifts) {
          totalEarnings = this.shiftService.calculateTotalPerShift(
            shift.shiftStartTime!,
            shift.shiftEndTime!,
            shift.shiftWage!
          );
          shiftInfo = {
            uid: this.UID,
            shiftSlug: shift.shiftSlug,
            shiftDate: shift.shiftDate,
            shiftDepartment: shift.shiftDepartment,
            shiftStartTime: shift.shiftStartTime,
            shiftEndTime: shift.shiftEndTime,
            shiftWage: shift.shiftWage,
            totalEarnings: totalEarnings,
          };
          this.shiftsData.push(shiftInfo);
        }
        this.dataSource = new MatTableDataSource(this.shiftsData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = this.createFilterOption();
      }
    });
  }
  filterListener() {
    this.searchForm.valueChanges.subscribe((res: any) => {
      const filter = JSON.stringify({
        ...res,
      });
      this.dataSource.filter = filter;
    });
  }
  createFilterOption(): (data: Ishift, filter: string) => boolean {
    let filterFunc = this.shiftService.filterFunc;
    return filterFunc;
  }
  onDateRangePickerClosed() {
    if (!this.searchForm.get('filterEndDate')!.value) {
      this.clearDateRange();
      this.snackbar.openErrorSnack('Please select both date values!');
    }
  }
  clearDateRange() {
    this.shiftService.clearDateInputs(
      this.searchForm,
      'filterStartDate',
      'filterEndDate'
    );
  }
}
