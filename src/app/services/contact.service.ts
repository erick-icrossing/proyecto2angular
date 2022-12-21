import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Contact } from '../shared/contact';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private api_url = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  get_contacts(): Observable<Contact[]> {
    const url = `${this.api_url}/contacts`;
    return this.http.get<Contact[]>(url);
  }

  get_contact_by_id(id: string): Observable<Contact> {
    const url = `${this.api_url}/contact/${id}`;
    return this.http.get<Contact>(url);
  }

  delete_contact(contact: Contact): Observable<Contact> {
    const url = `${this.api_url}/contact/${contact._id}`;
    return this.http.delete<Contact>(url);
  }

  update_contact(contact: Contact): Observable<Contact> {
    const url = `${this.api_url}/contact/${contact._id}`;
    return this.http.put<Contact>(url, contact, httpOptions);
  }

  add_contact(contact: Contact): Observable<Contact> {
    const url = `${this.api_url}/contact`;
    return this.http.post<Contact>(url, contact, httpOptions);
  }
}
