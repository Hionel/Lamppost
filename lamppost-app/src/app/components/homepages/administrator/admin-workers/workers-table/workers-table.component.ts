import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StoredUser } from 'src/app/interfaces/stored-user';
import { FirestoreFirebaseService } from 'src/app/services/firestore-firebase.service';

@Component({
  selector: 'app-workers-table',
  templateUrl: './workers-table.component.html',
  styleUrls: ['./workers-table.component.scss'],
})
export class WorkersTableComponent {
  displayedColumns: string[] = ['id', 'email', 'firstname', 'lastname'];
  dataSource!: MatTableDataSource<StoredUser>;
  usersData: StoredUser[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Output() selectUser: EventEmitter<StoredUser> =
    new EventEmitter<StoredUser>();

  constructor(private firestoreService: FirestoreFirebaseService) {
    this.getTableData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectUserFromTable(e: StoredUser) {
    this.selectUser.emit(e);
  }

  getTableData() {
    this.firestoreService.getAllUsersData().subscribe((response) => {
      this.usersData = [];
      if (response) {
        console.log(response);
        let i = 1;
        for (const user of response) {
          if (!user.adminAccount) {
            user.id = i;
            this.usersData.push(user);
            i++;
          }
        }
        this.dataSource = new MatTableDataSource(this.usersData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }
}
