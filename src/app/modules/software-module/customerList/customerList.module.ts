import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {AppAddCompanyComponent} from './components/add-company/app-add-company.component';
import {AppUpdateCompanyComponent} from './components/update-company/app-update-company.component';
import { CustomerListComponent } from './pages/customerList.component';

const COMPONENTS = [
  AppAddCompanyComponent,
  AppUpdateCompanyComponent
];

export const routes: Routes = [
  {
    path: '',
    component: CustomerListComponent
  }
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
