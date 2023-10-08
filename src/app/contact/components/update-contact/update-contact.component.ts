import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../model/contact';

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.component.html',
  styleUrls: ['./update-contact.component.scss'],
})
export class UpdateContactComponent {
  id: number = 0;
  contactForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phoneNumber: new FormControl(''),
    email: new FormControl(''),
  });
  constructor(
    private contactService: ContactService,
    private activerouter: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.activerouter.params.subscribe({
      next: (res) => {
        this.id = res['id'];
        this.contactService.get(this.id).subscribe({
          next: (contact) => {
            this.contactForm = new FormGroup({
              firstName: new FormControl(
                contact['firstName'],
                Validators.required
              ),
              lastName: new FormControl(
                contact['lastName'],
                Validators.required
              ),
              phoneNumber: new FormControl(contact['phoneNumber'], [
                Validators.required,
                Validators.pattern('[- +()0-9]+'),
              ]),
              email: new FormControl(contact['email'], [
                Validators.required,
                Validators.email,
              ]),
            });
          },
          error: () => this.contactService.openSnackBar('we cannot update contact due to system error ', 'close'),
        });
      },
    });
  }
  onSubmit() {
    let contact = new Contact();
    contact.firstName = this.contactForm.controls['firstName'].value;
    contact.lastName = this.contactForm.controls['lastName'].value;
    contact.phoneNumber = this.contactForm.controls['phoneNumber'].value;
    contact.lastName = this.contactForm.controls['lastName'].value;
    contact.email = this.contactForm.controls['email'].value;

    this.contactService.update(this.id, contact).subscribe({
      next: () => this.router.navigate(['/contacts/']),
      error: () =>
        this.contactService.openSnackBar(
          'error while updating contact',
          'close'
        ),
    });
  }
}
