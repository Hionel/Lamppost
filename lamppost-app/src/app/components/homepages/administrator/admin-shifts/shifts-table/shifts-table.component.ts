import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Ishift } from 'src/app/interfaces/ishift';
import { FirestoreFirebaseService } from 'src/app/services/firestore-firebase.service';

@Component({
  selector: 'app-shifts-table',
  templateUrl: './shifts-table.component.html',
  styleUrls: ['./shifts-table.component.scss'],
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
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() modificationsDone: boolean = false;
  searchFormGroup: FormGroup;
  constructor(
    private firestoreSerivce: FirestoreFirebaseService,
    private formBuilder: FormBuilder
  ) {
    this.getShifts();
    this.searchFormGroup = this.formBuilder.group({
      byName: '',
      byDepartment: '',
    });

    this.filterListener();
  }

  filterListener() {
    this.searchFormGroup.valueChanges.subscribe((res: any) => {
      console.log(res);
      const filter = JSON.stringify({
        ...res,
        inputName: res.byName,
      });
      this.dataSource.filter = filter;
    });
  }

  createFilterOption(): (data: Ishift, filter: string) => boolean {
    let filterFunc = function (data: any, filter: any): boolean {
      let search = JSON.parse(filter);
      console.log(search);
      console.log(data);

      if (search.byName && !search.byDepartment) {
        return data.fullname
          .trim()
          .toLowerCase()
          .includes(search.byName.trim().toLowerCase());
      }
      if (!search.byName && search.byDepartment) {
        return data.shiftDepartment
          .trim()
          .toLowerCase()
          .includes(search.byDepartment.trim().toLowerCase());
      }
      if (search.byName && search.byDepartment) {
        return (
          data.shiftDepartment
            .trim()
            .toLowerCase()
            .includes(search.byDepartment.trim().toLowerCase()) &&
          data.fullname
            .trim()
            .toLowerCase()
            .includes(search.byName.trim().toLowerCase())
        );
      }
      return true;
    };
    return filterFunc;
  }
  ngOnInit(): void {}

  selectShiftFromTable(shift: any) {}

  getShifts() {
    this.firestoreSerivce.getAllShifts().subscribe((response) => {
      response.forEach((data) => {
        let shiftInfo: Ishift;
        let totalEarnings: number;
        let fullname: string;
        this.firestoreSerivce.getFullname(data.shiftsUID).then((workerName) => {
          fullname = String(workerName);
          data.shifts.forEach((shift) => {
            totalEarnings = this.calculateTotalPerShift(
              shift.shiftStartTime,
              shift.shiftEndTime,
              shift.shiftWage
            );
            shiftInfo = {
              fullname: fullname,
              ...shift,
              totalEarnings: totalEarnings,
            };
            this.shiftsData.push(shiftInfo);
          });
          console.log(this.shiftsData);
          this.dataSource = new MatTableDataSource(this.shiftsData);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataSource.filterPredicate = this.createFilterOption();
        });
      });
    });
  }

  calculateTotalPerShift(start: string, end: string, wagePerHour: string) {
    let startTime = start.split(':');
    let endTime = end.split(':');
    let hDiff = Number(endTime[0]) - Number(startTime[0]);
    let mDiff = (Number(endTime[1]) - Number(startTime[1])) / 60;
    let hoursWorked = `${hDiff + mDiff}`;
    return (Math.round(Number(hoursWorked) * 100) / 100) * Number(wagePerHour);
  }
}
