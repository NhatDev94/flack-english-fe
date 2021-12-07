import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../../../shared/shared.module';
import { EmployeeComponent } from './page/employee.component';

const COMPONENTS = [

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
