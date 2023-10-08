import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContactService } from '../../services/contact.service';
import { DialogData } from '../../model/dialog-data';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private contactService: ContactService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
  deleteContact(id: number): void {
    this.contactService.delete(id).subscribe({
      next: () => {
        console.log('deleted');
        this.dialogRef.close();
      },
      error: () => this.contactService.openSnackBar('error on delete contract','close')
    });
  }
}
