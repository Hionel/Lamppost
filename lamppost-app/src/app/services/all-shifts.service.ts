import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DateTimeRemovalPipe } from '../customPipes/date-time-removal.pipe';

@Injectable({
  providedIn: 'root',
})
export class AllShiftsService {
  constructor() {}
  calculateTotalPerShift(start: string, end: string, wagePerHour: string) {
    let startTime = start.split(':');
    let endTime = end.split(':');
    let hDiff = Number(endTime[0]) - Number(startTime[0]);
    let mDiff = (Number(endTime[1]) - Number(startTime[1])) / 60;
    let hoursWorked = `${hDiff + mDiff}`;
    return (Math.round(Number(hoursWorked) * 100) / 100) * Number(wagePerHour);
  }
  clearDateInputs(form: FormGroup, field1: string, field2: string) {
    form.get(field1)!.reset();
    form.get(field2)!.reset();
  }
  filterFunc(data: any, filter: any): boolean {
    let search = JSON.parse(filter);
    const datePipe: DateTimeRemovalPipe = new DateTimeRemovalPipe();

    if (search.byName && !search.byDepartment) {
      if (search.filterStartDate && search.filterEndDate) {
        let endDate = new Date(datePipe.transform(search.filterEndDate));
        endDate.setDate(endDate.getDate() + 1);

        return (
          new Date(data.shiftDate) >=
            new Date(datePipe.transform(search.filterStartDate)) &&
          new Date(data.shiftDate) <= endDate &&
          data.fullname
            .trim()
            .toLowerCase()
            .includes(search.byName.trim().toLowerCase())
        );
      } else {
        return data.fullname
          .trim()
          .toLowerCase()
          .includes(search.byName.trim().toLowerCase());
      }
    }
    if (!search.byName && search.byDepartment) {
      if (search.filterStartDate && search.filterEndDate) {
        let endDate = new Date(datePipe.transform(search.filterEndDate));
        endDate.setDate(endDate.getDate() + 1);

        return (
          new Date(data.shiftDate) >=
            new Date(datePipe.transform(search.filterStartDate)) &&
          new Date(data.shiftDate) <= endDate &&
          data.shiftDepartment
            .trim()
            .toLowerCase()
            .includes(search.byDepartment.trim().toLowerCase())
        );
      } else {
        return data.shiftDepartment
          .trim()
          .toLowerCase()
          .includes(search.byDepartment.trim().toLowerCase());
      }
    }
    if (search.byName && search.byDepartment) {
      if (search.filterStartDate && search.filterEndDate) {
        let endDate = new Date(datePipe.transform(search.filterEndDate));
        endDate.setDate(endDate.getDate() + 1);

        return (
          new Date(data.shiftDate) >=
            new Date(datePipe.transform(search.filterStartDate)) &&
          new Date(data.shiftDate) <= endDate &&
          data.shiftDepartment
            .trim()
            .toLowerCase()
            .includes(search.byDepartment.trim().toLowerCase()) &&
          data.fullname
            .trim()
            .toLowerCase()
            .includes(search.byName.trim().toLowerCase())
        );
      } else {
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
    }
    if (search.filterStartDate && search.filterEndDate) {
      let endDate = new Date(datePipe.transform(search.filterEndDate));
      endDate.setDate(endDate.getDate() + 1);

      return (
        new Date(data.shiftDate) >=
          new Date(datePipe.transform(search.filterStartDate)) &&
        new Date(data.shiftDate) <= endDate
      );
    }

    return true;
  }
}
