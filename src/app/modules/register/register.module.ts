import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './pages/register.component';

export const routes: Routes = [
  {
    path: '',
    component: RegisterComponent
  },
];

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class RegisterModule {
}
