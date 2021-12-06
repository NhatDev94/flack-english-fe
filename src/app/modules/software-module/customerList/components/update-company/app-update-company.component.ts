import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {AppModalWrapperComponent} from '../../../../../shared/components/modal-wrapper/app-modal-wrapper.component';
import {CustomerModel} from '../../../../../data/schema/customer.model';
import {ResponseModel} from '../../../../../data/schema/response.model';
import {HTTP_CODE_CONSTANT} from '../../../../../core/constant/http-code.constant';
import {AppAlert, AppLoading} from '../../../../../shared/utils';
import {CustomerService} from '../../../../../core/service/software/customer.service';
import {AppValidation} from '../../../../../shared/utils/app-validation';
import {AppCommon} from '../../../../../shared/utils/app-common';

@Component({
  selector: 'app-update-company',
  templateUrl: './app-update-company.component.html',
})
export class AppUpdateCompanyComponent {

  @Output() saveCompleteEvent: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('appModalWrapper', {static: true}) appModalWrapper: AppModalWrapperComponent;
  public customer: CustomerModel = new CustomerModel();
  public newPassword: any
  constructor(
    private alert: AppAlert,
    private loading: AppLoading,
    private customerService: CustomerService,
    private validation: AppValidation,
    private appCommon: AppCommon
  ) {
  }

  public show(customer: CustomerModel) {
    this.customer = new CustomerModel(customer);
    this.appModalWrapper.show();
  }

  public hide() {
    this.appModalWrapper.hide();
  }

  public companyNameChange() {
    // if (this.company.name) {
    //   const nameSlug = this.company.name.trim().toLocaleLowerCase().replace(/ /g, '-');
    //   this.company.nameSlug = nameSlug;
    // }
  }

  public saveCustomer() {
    this.loading.show();
    if (!this.validation.validatePassword(this.newPassword)) {
      this.alert.error('Mật khẩu phải có nhiều hơn 6 kí tụ, có ít nhất 1 ký tự in hoa và 1 ký tự số');
      return;
    }
    this.customer.password = this.newPassword
    // this.company.phone = this.appCommon.getPhoneNumber(this.company.phone);
    this.customerService.update(this.customer).subscribe(res => this.saveCustomerCompleted(res));
    // Phai sua trong companyService nua
  }

  private saveCustomerCompleted(res: ResponseModel<CustomerModel>) {
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
