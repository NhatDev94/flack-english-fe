import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {AppModalWrapperComponent} from '../../../../../shared/components/modal-wrapper/app-modal-wrapper.component';
import {EmployeeModel} from '../../../../../data/schema/employee.model';
import {ResponseModel} from '../../../../../data/schema/response.model';
import {HTTP_CODE_CONSTANT} from '../../../../../core/constant/http-code.constant';
import {AppAlert, AppLoading} from '../../../../../shared/utils';
import {AppValidation} from '../../../../../shared/utils/app-validation';
import {AppCommon} from '../../../../../shared/utils/app-common';
import { EmployeeService } from 'src/app/core/service/software/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './app-update-employee.component.html',
})
export class AppUpdateEmployeeComponent {

  @Output() saveCompleteEvent: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('appModalWrapper', {static: true}) appModalWrapper: AppModalWrapperComponent;
  public employee: EmployeeModel = new EmployeeModel();
  public newPassword: any

  constructor(
    private alert: AppAlert,
    private loading: AppLoading,
    private employeeService: EmployeeService,
    private validation: AppValidation,
    private appCommon: AppCommon
  ) {
  }

  public show(employee: EmployeeModel) {
    this.employee = new EmployeeModel(employee);
    this.appModalWrapper.show();
  }

  public hide() {
    this.appModalWrapper.hide();
  }

  // public companyNameChange() {
  //   // if (this.company.name) {
  //   //   const nameSlug = this.company.name.trim().toLocaleLowerCase().replace(/ /g, '-');
  //   //   this.company.nameSlug = nameSlug;
  //   // }
  // }

  public saveCompany() {
    this.loading.show();
    // chua thay doi pass duoc
    // this.employee.password = this.newPassword
    // this.company.phone = this.appCommon.getPhoneNumber(this.company.phone);
    // Hoi Nhân hướng dẫn convert dâta
    this.employeeService.update(this.employee).subscribe(res => this.saveEmployeeCompleted(res));

  }

  private saveEmployeeCompleted(res: ResponseModel<EmployeeModel>) {
    this.loading.hide();
    if (res.status !== HTTP_CODE_CONSTANT.OK) {
      res.message.forEach(value => {
        this.alert.error(value);
      });
      return;
    }

    this.alert.success(res.message[0]);
    this.saveCompleteEvent.emit(res.result);
    this.hide();
  }
}
