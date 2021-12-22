import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
    ],
  },
  {
    path: 'company',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./company/company.module').then((m) => m.CompanyModule),
      },
    ],
  },
  {
    path: 'customer',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./customerList/customerList.module').then((m) => m.CustomerListModule),
      },
    ],
  },
  {
    // sua lai path: employee -> nhan vien cu the thi path= 'employee:id'
    path: 'employee',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./employeeList/employeeList.module').then((m) => m.EmployeeListModule),
      },
    ],
  },
  {
    path: 'courses',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./courses/courses.module').then((m) => m.CoursesModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppPagesRoutingModule {
}
