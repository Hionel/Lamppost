import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Ishift } from 'src/app/interfaces/ishift';
import { AllShiftsService } from 'src/app/services/all-shifts.service';
import { FirestoreFirebaseService } from 'src/app/services/firestore-firebase.service';
import { SnackbarNotificationService } from 'src/app/services/snackbar-notification.service';

const ELEMENT_DATA_MOCKUP: any[] = [
  { fullname: 'Hydrogen', shiftDate: 'dd/mm/yyyy' },
  { fullname: 'Helium', shiftDate: 'dd/mm/yyyy' },
  { fullname: 'Lithium', shiftDate: 'dd/mm/yyyy' },
  { fullname: 'Beryllium', shiftDate: 'dd/mm/yyyy' },
  { fullname: 'Boron', shiftDate: 'dd/mm/yyyy' },
  { fullname: 'Carbon', shiftDate: 'dd/mm/yyyy' },
  { fullname: 'Nitrogen', shiftDate: 'dd/mm/yyyy' },
  { fullname: 'Oxygen', shiftDate: 'dd/mm/yyyy' },
  { fullname: 'Fluorine', shiftDate: 'dd/mm/yyyy' },
  { fullname: 'Neon', shiftDate: 'dd/mm/yyyy' },
];

@Component({
  selector: 'app-past-shifts-card',
  templateUrl: './past-shifts-card.component.html',
  styleUrls: ['./past-shifts-card.component.scss'],
})
export class PastShiftsCardComponent {
  displayedColumns: string[] = ['fullname', 'shiftDate'];

  dataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>(
    ELEMENT_DATA_MOCKUP
  );
  @Output() selectedShift: EventEmitter<Ishift> = new EventEmitter<Ishift>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  searchFormGroup: FormGroup;
  constructor(
    private firestoreSerivce: FirestoreFirebaseService,
    private shiftsService: AllShiftsService,
    private snackbar: SnackbarNotificationService
  ) {
    this.getShifts();
    this.searchFormGroup = new FormGroup({
      byName: new FormControl(''),
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getShifts() {}
}
