import { Component, OnInit, ViewChild } from '@angular/core';
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
export class WorkersTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'email', 'firstname', 'lastname'];
  dataSource!: MatTableDataSource<StoredUser>;
  usersData: StoredUser[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private firestoreService: FirestoreFirebaseService) {
    this.firestoreService.getAllUsersData().subscribe((response) => {
      if (response) {
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
  ngOnInit(): void {
    console.log(this.usersData);
    console.log(this.dataSource);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
