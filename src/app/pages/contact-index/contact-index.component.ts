import { Component, signal } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-contact-index',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    RouterLink
  ],
  templateUrl: './contact-index.component.html',
  styleUrl: './contact-index.component.scss'
})
export class ContactIndexComponent {

  contacts = signal<any[]>([]);

  constructor(
    private contactService: ContactService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {
    this.loadData();
  }

  loadData() {
    this.contactService.get().subscribe(data => {
      this.contacts.set(data);
    })
  }

  delete(c: any) {
    this.confirmationService.confirm({
      header: 'Confirmer ?',
      accept: () => {
        this.contactService.remove(c.id).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Contact supprimé' });
          this.loadData();
        })
      }
    })
  }
}
