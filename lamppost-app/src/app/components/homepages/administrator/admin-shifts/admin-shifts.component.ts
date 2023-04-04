import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Ishift } from 'src/app/interfaces/ishift';

import { EditShiftOverlayComponent } from './edit-shift-overlay/edit-shift-overlay.component';

@Component({
  selector: 'app-admin-shifts',
  templateUrl: './admin-shifts.component.html',
  styleUrls: ['./admin-shifts.component.scss'],
})
export class AdminShiftsComponent implements OnInit {
  constructor(private matDialog: MatDialog, private router: Router) {}
  onSelectShift(selectedShift: Ishift) {
    this.router.navigate([
      `/administrator/shifts/edit-shift:${selectedShift.shiftSlug}`,
    ]);
    const dialogRef = this.matDialog.open(EditShiftOverlayComponent, {
      data: selectedShift,
      height: 'fit-content',
      width: '35%',
      hasBackdrop: true,
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.router.navigate(['/administrator/shifts']);
    });
  }
  ngOnInit(): void {}
}
