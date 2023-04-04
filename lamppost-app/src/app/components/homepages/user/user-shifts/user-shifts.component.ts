import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-shifts',
  templateUrl: './user-shifts.component.html',
  styleUrls: ['./user-shifts.component.scss'],
})
export class UserShiftsComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.router.navigate(['/homepage/shifts/add-shift']);
  }
}
