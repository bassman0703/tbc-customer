import { Routes } from '@angular/router';
import {CustomersComponent} from "./pages/customers/customers.component";
import {AccountsComponent} from "./pages/accounts/accounts.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/customers',
    pathMatch: 'full'
  },
  {
    path: 'accounts',
    component: AccountsComponent
  },
  {
    path: 'customers',
    component: CustomersComponent
  },

];
