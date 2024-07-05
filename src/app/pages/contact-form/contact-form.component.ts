import { Component, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { TypeService } from '../../services/type.service';
import { ContactService } from '../../services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, InputTextModule, ButtonModule, FieldsetModule, DropdownModule, FloatLabelModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {

  id: number|null = null;

  form: FormGroup;

  types = signal<any[]>([]);

  constructor(
    private formBuilder: FormBuilder,
    private typeService: TypeService,
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
  ) {
    this.form = formBuilder.group({
      lastName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      firstName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: [null, [Validators.required, Validators.email]],
      tel: [null, [Validators.required]],
      typeId: [null, [Validators.required]],
      addresses: formBuilder.array([
      ])
    });

    this.typeService.getAll().subscribe(data => {
      this.types.set(data);
    })

    this.route.params.subscribe(p => {
      this.id = p['id'];
      if(this.id) {
        this.contactService.getById(this.id).subscribe(data => {
          this.form.patchValue(data);
          for(let ad of data.addresses) {
            this.addAddress(ad);
          }
        })
      }
    })
  }

  getAddresses() {
    return this.form.controls['addresses'] as FormArray
  }

  addAddress(data: any = null) {
    const adGroup = this.formBuilder.group({
      id: [null],
      street: [null, [Validators.required]],
      number: [null, [Validators.required]],
      zipCode: [null, [Validators.required]],
      city: [null, [Validators.required]],
      main: [false, []]
    })
    if(data) {
      adGroup.patchValue(data);
    }
    this.getAddresses().push(adGroup)
  }

  submit() {
    if(this.form.valid) {
      if(this.id) {
        this.contactService.update(this.id, this.form.value).subscribe(() => {
          this.onSuccess()
        });
      }
      else {
        this.contactService.add(this.form.value).subscribe(() => {
          this.onSuccess()
        });
      }
    }
  }

  onSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Contact enregistré'
    })
    this.router.navigate(['/index']);
  }
}
