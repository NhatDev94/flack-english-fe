import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../../../shared/shared.module';
import { AppAddCompanyComponent } from './components/add-company/app-add-company.component';
import { AppUpdateCompanyComponent } from './components/update-company/app-update-company.component';
import { EmployeeComponent } from './page/employee.component';

const COMPONENTS = [
  AppAddCompanyComponent,
  AppUpdateCompanyComponent
];

export const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent
  },
  
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    EmployeeComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class EmployeeModule {
}
