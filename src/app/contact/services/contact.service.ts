import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../model/contact';
import { MatSnackBar } from '@angular/material/snack-bar';

const baseUrl = 'http://localhost:8080/contacts';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  getAll(params?: HttpParams): Observable<any> {
    return this.http.get(`${baseUrl}/`, {params: params});
  }

  get(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${baseUrl}/${id}`);
  }

  create(data: Contact): Observable<any> {
    return this.http.post(`${baseUrl}/`, data);
  }

  update(id: number, data: Contact): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
}
