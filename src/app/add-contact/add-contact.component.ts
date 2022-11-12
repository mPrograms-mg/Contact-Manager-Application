import { Component, OnInit } from '@angular/core';
import { Group } from '../Model/Group';
import { ContactService } from '../Services/contact.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ContactForm } from '../Model/ContactForm';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css'],
})
export class AddContactComponent implements OnInit {
  public groups = [] as Group[];
  public errorMessage: string = null;
  public contactForm: FormGroup;
  public contactId: string = null;
  public contactData: string | undefined;
  isAddMode!: boolean;
  loading = false;
  submitted = false;
  isEdit = false;

  constructor(
    private router: Router,
    private activetedRoute: ActivatedRoute,
    private contactService: ContactService,
    private formBuilder: FormBuilder
  ) {
    this.contactForm = this.formBuilder.group({
      name: new FormControl(''),
      photoUrl: new FormControl(''),
      email: new FormControl(''),
      mobile: new FormControl(''),
      company: new FormControl(''),
      title: new FormControl(''),
      groupId: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.activetedRoute.paramMap.subscribe((param) => {
      this.contactId = param.get('contactId');
    });
    this.isAddMode = !this.contactId;
    console.log('Id....', this.contactId);

    this.contactService.getAllGroups().subscribe(
      (data: Group[]) => {
        this.groups = data;
      },
      (error) => {
        this.errorMessage = error;
      }
    );

    if (!this.isAddMode) {
      this.contactService
        .getSingleContact(this.contactId)
        .pipe()
        .subscribe((x) => {
          this.contactForm.patchValue(x);
        });
    }
  }
  ContactSubmit() {
    this.submitted = true;
    if (this.isAddMode) {
      this.CreateContact();
    } else {
      this.UpdateContact();
    }
  }
  CreateContact() {
    this.contactService.createContact(this.contactForm.value).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
    this.router.navigate(['/']).then();
  }

  UpdateContact() {
    this.contactService
      .updateContact(this.contactId, this.contactForm.value)
      .subscribe((newData) => {
        console.log('New Data...', newData);
        this.router.navigate(['/']).then();
      });
  }
}
