import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

// Pipes
import * as Pipes from '../shared/utils/pipes';

// Components
import {AppAdiBoxComponent} from './components/adi-box/app-adi-box.component';
import {AppDataTableComponent} from './components/data-table/app-data-table.component';
import {AppDateControlComponent} from './components/date/app-date-control.component';
import {AppDateTimeControlComponent} from './components/date/app-date-time-control.component';
import {AppTimeControlComponent} from './components/date/app-time-control.component';
import {AppWeekControlComponent} from './components/date/app-week-control.component';
import {DropdownMenuComponent} from './components/dropdown-menu/dropdown-menu.component';
import {InputMaskComponent} from './components/input-mask/input-mask.component';
import {AppModalWrapperComponent} from './components/modal-wrapper/app-modal-wrapper.component';
import {AppSelect2ControlComponent} from './components/select2/app-select2-control.component';
import {AppSelect2AsyncComponent} from './components/select2-async/app-select2-async.component';
import {AppSwitchControlComponent} from './components/switch/app-switch-control.component';
import {AppFileDragDropControlComponent} from './components/upload/drag-drop/app-file-drag-drop-control.component';
import {AppFileNormalControlComponent} from './components/upload/normal/app-file-normal-control.component';
import {AppEmployeeProfileComponent} from './components/employee-profile/app-employee-profile.component';
import {AppMessageNotificationComponent} from './components/notification/message/app-message-notification.component';
import {AppDataTable2Component} from './components/data-table-2/app-data-table-2.component';
import {AutoCompleteModule} from 'primeng/autocomplete';

const COMPONENTS = [
  AppAdiBoxComponent,
  AppDataTableComponent,
  AppDataTable2Component,
  AppDateControlComponent,
  AppDateTimeControlComponent,
  AppTimeControlComponent,
  AppWeekControlComponent,
  DropdownMenuComponent,
  InputMaskComponent,
  AppModalWrapperComponent,
  AppSelect2ControlComponent,
  AppSelect2AsyncComponent,
  AppSwitchControlComponent,
  AppFileDragDropControlComponent,
  AppFileNormalControlComponent,
  AppEmployeeProfileComponent,
  AppMessageNotificationComponent
];

const PIPES = [
  Pipes.PhonePipe
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...PIPES
  ],
  imports: [
    CommonModule,
    FormsModule,
    AutoCompleteModule,
  ],
  exports: [
    ...COMPONENTS,
    ...PIPES,
    CommonModule,
    FormsModule,
    AutoCompleteModule,
  ]
})
export class SharedModule {
}
