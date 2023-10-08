import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListContactComponent } from './components/list-contact/list-contact.component';
import { DetailContactComponent } from './components/detail-contact/detail-contact.component';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { UpdateContactComponent } from './components/update-contact/update-contact.component';

const routes: Routes = [
  { path: '', redirectTo: 'contacts', pathMatch: 'full' },
  { path: 'contacts/add', component: AddContactComponent , pathMatch: 'full'},
  { path: 'contacts', component: ListContactComponent, pathMatch: 'full' },
  { path: 'contacts/:id', component: DetailContactComponent, pathMatch: 'full' },
  { path: 'contacts/edit/:id', component: UpdateContactComponent , pathMatch: 'full'},
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
