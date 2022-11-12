import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactForm } from '../Model/ContactForm';
import { ContactService } from '../Services/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css'],
})
export class ContactManagerComponent implements OnInit {
  AllContact: ContactForm[] = [];
  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit(): void {
    this.getContact();
  }

  getContact() {
    this.contactService.getAllContact().subscribe((data: any) => {
      //console.log('Data...', data);
      this.AllContact = data;
    });
  }

  editContact(id: string) {
    this.router.navigate([`contact/edit/${id}`]).then();
  }

  deleteContact(id: string) {
    this.contactService.deleteContact(id).subscribe(() => {
      alert('Delete Contact');
      this.getContact();
    });
  }
}
