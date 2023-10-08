import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../../model/contact';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
})
export class AddContactComponent {
  contactForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('')]),
    email: new FormControl('',  [Validators.required, Validators.email]),
  });
  constructor(
    private contactService: ContactService,
    private router: Router
  ) {}

  onSubmit() {
    let contact = new Contact();
    contact.firstName = this.contactForm.controls['firstName'].value;
    contact.lastName = this.contactForm.controls['lastName'].value;
    contact.phoneNumber = this.contactForm.controls['phoneNumber'].value;
    contact.lastName = this.contactForm.controls['lastName'].value;
    contact.email = this.contactForm.controls['email'].value;

    this.contactService.create(contact).subscribe({
      next: () => this.router.navigate(['/contacts']),
      error: () =>
        this.contactService.openSnackBar(
          'error while creating contact',
          'close'
        ),
    });
  }
}
