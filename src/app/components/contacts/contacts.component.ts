import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ContactService } from 'src/app/services/contact.service';
import { Contact } from 'src/app/shared/contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactService],
})
export class ContactsComponent implements OnInit {
  contacts!: Contact[];

  displayedColumns: string[] = ['first_name', 'last_name', 'email', '_id'];
  edit_id: string | undefined = undefined;
  @ViewChild('newContactForm') addForm!: NgForm;
  @ViewChild('editContactForm') editForm!: NgForm;
  editionMode = false;

  constructor(private contactsService: ContactService) {}

  ngOnInit(): void {
    this.get_contacts();
  }

  get_contacts() {
    this.contactsService.get_contacts().subscribe((all_contacts) => {
      this.contacts = all_contacts;
    });
  }

  search_contact(id: string) {
    this.edit_id = id;
    this.contactsService.get_contact_by_id(id).subscribe((contact) => {
      this.editForm.setValue({
        first_name: contact.first_name,
        last_name: contact.last_name,
        email: contact.email,
        _id: contact._id,
      });
    });
  }

  delete_contact(contact: Contact) {
    this.contactsService.delete_contact(contact).subscribe(() => {
      this.contacts = this.contacts.filter((c) => c._id !== contact._id);
    });
  }

  update_contact() {
    this.contactsService
      .update_contact({ _id: this.edit_id, ...this.editForm.value })
      .subscribe(() => {
        this.get_contacts();
      });
  }

  add_contact() {
    this.contactsService.add_contact(this.addForm.value).subscribe(() => {
      this.get_contacts();
    });
  }
}
