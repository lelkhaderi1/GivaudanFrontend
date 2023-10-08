import { Component } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../../model/contact';

@Component({
  selector: 'app-detail-contact',
  templateUrl: './detail-contact.component.html',
  styleUrls: ['./detail-contact.component.scss'],
})
export class DetailContactComponent {
  id: number = 0;
  contact: Contact = new Contact();
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
          next: (res) => (this.contact = res),
          error: () =>
            this.contactService.openSnackBar(
              'we cannot load contact due to system error ',
              'close'
            ),
        });
      },
    });
  }
  redirectTo(uri: string, id?: number) {
    if (id) {
      this.router.navigate([uri, id]);
    } else {
      this.router.navigate([uri]);
    }
  }
}
