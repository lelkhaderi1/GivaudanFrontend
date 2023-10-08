import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../model/contact';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.scss'],
})
export class ListContactComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'operation'];
  dataSource = new MatTableDataSource([]);
  contacts: Contact[] = [];
  searchForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phoneNumber: new FormControl(''),
    email: new FormControl(''),
  });

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private contactService: ContactService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  ngOnInit() {
    this.loadContacts();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  deleteContacts(id: number, firstName: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'confirmation',
        content: 'are you sure you want to delete ' + firstName,
        id: id,
      },
    });

    dialogRef.afterClosed().subscribe({
      next: () => this.loadContacts(),
      error: () =>
        this.contactService.openSnackBar('after in close dialog', 'close'),
    });
  }

  redirectTo(uri: string, id?: number) {
    if (id) {
      this.router.navigate([uri, id]);
    } else {
      this.router.navigate([uri]);
    }
  }

  loadContacts(params?: HttpParams): void {
    this.contactService.getAll(params).subscribe({
      next: (rest) => {
        this.contacts = rest;
        this.dataSource = new MatTableDataSource(rest);
        this.dataSource.sort = this.sort;
      },
      error: () =>
        this.contactService.openSnackBar('error loading contact list', 'close'),
    });
  }
  onSubmit() {
    const params = {
      email: this.searchForm.controls['email'].value,
      firstName: this.searchForm.controls['firstName'].value,
      lastName: this.searchForm.controls['lastName'].value,
    };

    this.loadContacts(new HttpParams({ fromObject: params }));
  }
}
