import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {AppAddCourseComponent} from './components/add-course/app-add-course.component';
import {AppUpdateCourseComponent} from './components/update-course/app-update-course.component';
import { AppSearchCourseComponent } from './components/search-course/app-search-course.component';
import { CoursesComponent } from './pages/courses.component';

const COMPONENTS = [
  AppAddCourseComponent,
  AppUpdateCourseComponent,
  AppSearchCourseComponent
];

export const routes: Routes = [
  {
    path: '',
    component: CoursesComponent
  },
  {
    path: ':id',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./components/course/course.module').then((m) => m.CourseModel),
      },
    ],
  },
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    CoursesComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class CoursesModule {
}
