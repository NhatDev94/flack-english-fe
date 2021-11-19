import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {CompanyComponent} from './pages/company.component';
import {AppAddCompanyComponent} from './components/add-company/app-add-company.component';
import {AppUpdateCompanyComponent} from './components/update-company/app-update-company.component';
import { CustomerComponent } from '../customer/customer.component';
import { DemoComponent } from './components/demo/demo.component';

const COMPONENTS = [
  AppAddCompanyComponent,
  AppUpdateCompanyComponent
];

export const routes: Routes = [
  {
    path: '',
    component: CompanyComponent,
  },
  {
    path: ':12',
    component: DemoComponent,
  }
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    CompanyComponent,
    DemoComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class CompanyModule {
}
