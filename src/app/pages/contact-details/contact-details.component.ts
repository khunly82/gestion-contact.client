import { Component, signal } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-details',
  standalone: true,
  imports: [CardModule, ButtonModule, FieldsetModule, CommonModule],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss'
})
export class ContactDetailsComponent {

  contact = signal<any>(null);

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(p => {
      const id = p['id'];
      this.loadData(id);
    })
  }

  loadData(id: any) {
    this.contactService.getById(id).subscribe(data => {
      this.contact.set(data);
    })
  }
}
