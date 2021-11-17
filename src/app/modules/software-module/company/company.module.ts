import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {CompanyComponent} from './pages/company.component';
import {AppAddCompanyComponent} from './components/add-company/app-add-company.component';
import {AppUpdateCompanyComponent} from './components/update-company/app-update-company.component';

const COMPONENTS = [
  AppAddCompanyComponent,
  AppUpdateCompanyComponent
];

export const routes: Routes = [
  {
    path: '',
    component: CompanyComponent
  }
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    CompanyComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class CompanyModule {
}
