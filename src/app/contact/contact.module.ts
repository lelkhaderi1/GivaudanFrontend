import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { DetailContactComponent } from './components/detail-contact/detail-contact.component';
import { ListContactComponent } from './components/list-contact/list-contact.component';
import { UpdateContactComponent } from './components/update-contact/update-contact.component';
import { ContactRoutingModule } from './contact-routing.module';
import { DialogComponent } from './components/dialog/dialog.component';

@NgModule({
  declarations: [
    AddContactComponent,
    ListContactComponent,
    DetailContactComponent,
    DialogComponent,
    UpdateContactComponent,
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    MatTableModule,
    MatSortModule,
    HttpClientModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatListModule
  ],
})
export class ContactModule {}
