import { Routes } from '@angular/router';
import { ContactIndexComponent } from './pages/contact-index/contact-index.component';
import { ContactFormComponent } from './pages/contact-form/contact-form.component';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';

export const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: ContactIndexComponent },
    { path: 'add', component: ContactFormComponent },
    { path: 'update/:id', component: ContactFormComponent },
    { path: 'details/:id', component: ContactDetailsComponent },
];
