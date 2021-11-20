import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../../../shared/shared.module';
import { AppAddCompanyComponent } from './components/add-company/app-add-company.component';
import { AppUpdateCompanyComponent } from './components/update-company/app-update-company.component';
import { CustomerComponent } from './page/customer.component';

const COMPONENTS = [
  AppAddCompanyComponent,
  AppUpdateCompanyComponent
];

export const routes: Routes = [
  {
    path: '',
    component: CustomerComponent
  },
  
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    CustomerComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class CustomerModule {
}
