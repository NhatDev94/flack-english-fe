import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../../../shared/shared.module';
import { CourseComponent } from './page/course.component';
import { AppSearchVocabularyComponent } from './components/search-vocabulary/app-search-vocabulary.component'
import { AppShowVocabularyComponent } from './components/show-vocabulary/app-show-vocabulary.component';
import { AppAddVocabularyComponent } from './components/add-vocabulary/app-add-vocabulary.component';

const COMPONENTS = [
  AppSearchVocabularyComponent,
  AppShowVocabularyComponent,
  AppAddVocabularyComponent
];

export const routes: Routes = [
  {
    path: '',
    component: CourseComponent
  },
  
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    CourseComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class CourseModel {
}
