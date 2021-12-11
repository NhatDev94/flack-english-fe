import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {AppAddCustomerComponent} from './components/add-customer/app-add-customer.component';
import {AppUpdateCustomerComponent} from './components/update-customer/app-update-customer.component';
import { CustomerListComponent } from './pages/customerList.component';

const COMPONENTS = [
  AppAddCustomerComponent,
  AppUpdateCustomerComponent
];

export const routes: Routes = [
  {
    path: '',
    component: CustomerListComponent
  },
  {
    path: ':id',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./components/customer/customer.module').then((m) => m.CustomerModule),
      },
    ],
  },
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    CustomerListComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class CustomerListModule {
}
