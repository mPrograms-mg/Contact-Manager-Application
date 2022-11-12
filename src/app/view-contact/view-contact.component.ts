import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '../Model/Contact';
import { ContactService } from '../Services/contact.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css'],
})
export class ViewContactComponent implements OnInit {
  public contactId: string = null;
  public contact: any;
  public group: any;

  constructor(
    private activetedRoute: ActivatedRoute,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.activetedRoute.paramMap.subscribe((param) => {
      this.contactId = param.get('contactId');
    });

    this.contactService.getSingleContact(this.contactId).subscribe((res) => {
      // console.log('Respone...', res);
      this.contact = res;
      this.contactService.getGroup(res).subscribe((data) => {
        this.group = data;
      });
    });
  }
}
