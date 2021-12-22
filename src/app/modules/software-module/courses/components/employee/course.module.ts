import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../../../shared/shared.module';
import { EmployeeComponent } from './page/employee.component';
import { AppAddEmployeeComponent } from './components/add-employee/app-add-employee.component'
import { AppUpdateEmployeeComponent } from './components/update-employee/app-update-employee.component'
import { AppShowCourseComponent } from './components/show-course/app-show-course.component';
import { AppAddCourseComponent } from './components/add-course/app-add-course.component';

const COMPONENTS = [
  AppAddEmployeeComponent,
  AppUpdateEmployeeComponent,
  AppShowCourseComponent,
  AppAddCourseComponent
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
export class CourseModel {
}
