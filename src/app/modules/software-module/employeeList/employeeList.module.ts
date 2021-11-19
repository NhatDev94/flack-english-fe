import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {EmployeeListComponent} from './pages/employeeList.component';
import {AppAddCompanyComponent} from './components/add-company/app-add-company.component';
import {AppUpdateCompanyComponent} from './components/update-company/app-update-company.component';
import { EmployeeComponent } from './components/employee/employee.component';

const COMPONENTS = [
  AppAddCompanyComponent,
  AppUpdateCompanyComponent,
];

export const routes: Routes = [
  {
    path: '',
    component: EmployeeListComponent
  },
  {
    path: ':id',
    // path nay co nghia la: /employeeList/id
    // -> link router đến path /employeeList/id
    component: EmployeeComponent
  },
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    EmployeeListComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class EmployeeModule {
}
