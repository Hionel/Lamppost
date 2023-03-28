import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})
export class SnackbarNotificationService {
  constructor(private snackBar: MatSnackBar) {}
  private _Xposition: MatSnackBarHorizontalPosition = 'left';
  private _Yposition: MatSnackBarVerticalPosition = 'top';
  private _duration: number = 2000;

  openSuccessSnack = (message: string) => {
    this.snackBar.open(message, 'Ok', {
      horizontalPosition: this._Xposition,
      verticalPosition: this._Yposition,
      duration: this._duration,
      panelClass: ['green-snackbar'],
    });
  };

  openErrorSnack = (message: string) => {
    this.snackBar.open(message, 'Close', {
      horizontalPosition: this._Xposition,
      verticalPosition: this._Yposition,
      duration: this._duration,
      panelClass: ['red-snackbar'],
    });
  };
}
