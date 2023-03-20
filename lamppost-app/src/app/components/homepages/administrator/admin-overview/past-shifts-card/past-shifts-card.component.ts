import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Ishift } from 'src/app/interfaces/ishift';

@Component({
  selector: 'app-past-shifts-card',
  templateUrl: './past-shifts-card.component.html',
  styleUrls: ['./past-shifts-card.component.scss'],
})
export class PastShiftsCardComponent implements OnInit {
  displayedColumns: string[] = ['fullname', 'shiftDate'];
  @Input() thisWeekTableData!: Ishift[];
  dataSource!: MatTableDataSource<Ishift>;
  @Output() selectedShift: EventEmitter<Ishift> = new EventEmitter<Ishift>();
  @ViewChild(MatSort) sort!: MatSort;

  searchFormGroup: FormGroup;
  constructor() {
    this.searchFormGroup = new FormGroup({
      byName: new FormControl(''),
    });
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Ishift>(this.thisWeekTableData);
    this.dataSource.filterPredicate = (data: Ishift, filter: string) => {
      return data.fullname!.toLowerCase().includes(filter);
    };
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
