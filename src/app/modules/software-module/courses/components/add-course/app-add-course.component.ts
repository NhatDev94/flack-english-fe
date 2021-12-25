import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {AppModalWrapperComponent} from '../../../../../shared/components/modal-wrapper/app-modal-wrapper.component';
import {ResponseModel} from '../../../../../data/schema/response.model';
import {HTTP_CODE_CONSTANT} from '../../../../../core/constant/http-code.constant';
import {AppAlert, AppLoading} from '../../../../../shared/utils';
import {AppValidation} from '../../../../../shared/utils/app-validation';
import {AppCommon} from '../../../../../shared/utils/app-common';
import {EmployeeService} from '../../../../../core/service/software/employee.service';
import { EmployeeModel } from 'src/app/data/schema/employee.model';

@Component({
  selector: 'app-add-course',
  templateUrl: './app-add-course.component.html',
})
export class AppAddCourseComponent {
  @Output() saveCompleteEvent: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('appModalWrapper', {static: true}) appModalWrapper: AppModalWrapperComponent;
  public course: EmployeeModel = new EmployeeModel();

  constructor(
    private alert: AppAlert,
    private loading: AppLoading,
    private employeeService: EmployeeService,
    private validation: AppValidation,
    private appCommon: AppCommon
  ) {

    let demo = this.appCommon.nowDate("2021,12,3,12,45,53")
    console.log(demo);
    
  }

  public show() {
    this.course = new EmployeeModel();
    this.appModalWrapper.show();
  }

  public hide() {
    this.appModalWrapper.hide();
  }

  // public companyNameChange() {
  //   if (this.employee.name) {
  //     const nameSlug = this.employee.name.trim().toLocaleLowerCase().replace(/ /g, '-');
  //     this.employee.nameSlug = nameSlug;
  //   }
  // }

  public saveEmployee() {

    // if (!this.validation.validatePassword(this.course.password)) {
    //   this.alert.error('Mật khẩu phải có nhiều hơn 6 kí tụ, có ít nhất 1 ký tự in hoa và 1 ký tự số');
    //   return;
    // }
    this.loading.show();
    // Chua chuyen dinh dang ngay thang nam
    // this.employee.phoneNumber = this.appCommon.getPhoneNumber(this.employee.phoneNumber);

    this.employeeService.save(this.course).subscribe(res => this.saveEmployeeCompleted(res));
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
