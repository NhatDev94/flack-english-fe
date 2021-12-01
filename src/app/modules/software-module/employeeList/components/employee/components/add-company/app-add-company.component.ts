import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {EmployeeModel} from '../../../../../../../data/schema/employee.model';
import {AppModalWrapperComponent} from '../../../../../../../shared/components/modal-wrapper/app-modal-wrapper.component';
import {ResponseModel} from '../../../../../../../data/schema/response.model';
import {HTTP_CODE_CONSTANT} from '../../../../../../../core/constant/http-code.constant';
import {AppAlert, AppLoading} from '../../../../../../../shared/utils';
import {AppValidation} from '../../../../../../../shared/utils/app-validation';
import {AppCommon} from '../../../../../../../shared/utils/app-common';
import {EmployeeService} from '../../../../../../../core/service/software/employee.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './app-add-company.component.html',
})
export class AppAddCompanyComponent {
  @Output() saveCompleteEvent: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('appModalWrapper', {static: true}) appModalWrapper: AppModalWrapperComponent;
  public employee: EmployeeModel = new EmployeeModel();

  constructor(
    private alert: AppAlert,
    private loading: AppLoading,
    private employeeService: EmployeeService,
    private validation: AppValidation,
    private appCommon: AppCommon
  ) {
  }

  public show() {
    this.employee = new EmployeeModel();
    this.appModalWrapper.show();
  }

  public hide() {
    this.appModalWrapper.hide();
  }

  public companyNameChange() {
    // if (this.employee.userName) {
    //   const nameSlug = this.employee.userName.trim().toLocaleLowerCase().replace(/ /g, '-');
    //   this.employee.userName = nameSlug;
    // }
  }

  public saveEmployee() {
    console.log(this.employee);
    
    if (!this.validation.validatePassword(this.employee.password)) {
      this.alert.error('Mật khẩu phải có nhiều hơn 6 kí tụ, có ít nhất 1 ký tự in hoa và 1 ký tự số');
      return;
    }
    this.loading.show();

    this.employee.phoneNumber = this.appCommon.getPhoneNumber(this.employee.phoneNumber);
    // phai xu ly du lieu nhu the nao
    this.employeeService.save(this.employee).subscribe(res => this.saveEmployeeCompleted(res));
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
