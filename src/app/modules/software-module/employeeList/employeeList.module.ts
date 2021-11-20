import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {EmployeeListComponent} from './pages/employeeList.component';
import {AppAddCompanyComponent} from './components/add-company/app-add-company.component';
import {AppUpdateCompanyComponent} from './components/update-company/app-update-company.component';

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
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../employee/employee.module').then((m) => m.EmployeeModule),
      },
    ],
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
export class EmployeeListModule {
}
