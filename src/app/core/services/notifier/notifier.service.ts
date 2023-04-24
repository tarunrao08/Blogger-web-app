import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotifierService {
  constructor(private snackbar: MatSnackBar) {}

  showNotifcation(message: string, buttonText: string = 'close') {
    this.snackbar.open(message, buttonText, {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
}
