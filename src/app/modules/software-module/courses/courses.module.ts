import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {AppAddEmployeeComponent} from './components/add-employee/app-add-employee.component';
import {AppUpdateEmployeeComponent} from './components/update-employee/app-update-employee.component';
import { EmployeeListComponent } from './pages/employeeList.component';

const COMPONENTS = [
  AppAddEmployeeComponent,
  AppUpdateEmployeeComponent
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
          import('./components/employee/course.module').then((m) => m.CourseModel),
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
export class CoursesModule {
}
