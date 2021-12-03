import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {AppModalWrapperComponent} from '../../../../../shared/components/modal-wrapper/app-modal-wrapper.component';
import {ResponseModel} from '../../../../../data/schema/response.model';
import {HTTP_CODE_CONSTANT} from '../../../../../core/constant/http-code.constant';
import {AppAlert, AppLoading} from '../../../../../shared/utils';
import {AppValidation} from '../../../../../shared/utils/app-validation';
import {AppCommon} from '../../../../../shared/utils/app-common';
import {CustomerService} from '../../../../../core/service/software/customer.service';
import { CustomerModel } from 'src/app/data/schema/customer.model';

@Component({
  selector: 'app-add-company',
  templateUrl: './app-add-company.component.html',
})
export class AppAddCompanyComponent {
  @Output() saveCompleteEvent: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('appModalWrapper', {static: true}) appModalWrapper: AppModalWrapperComponent;
  public customer: CustomerModel = new CustomerModel();

  constructor(
    private alert: AppAlert,
    private loading: AppLoading,
    private customerService: CustomerService,
    private validation: AppValidation,
    private appCommon: AppCommon
  ) {
  }

  public show() {
    this.customer = new CustomerModel();
    this.appModalWrapper.show();
  }

  public hide() {
    this.appModalWrapper.hide();
  }

  // public companyNameChange() {
  //   if (this.company.name) {
  //     const nameSlug = this.company.name.trim().toLocaleLowerCase().replace(/ /g, '-');
  //     this.company.nameSlug = nameSlug;
  //   }
  // }

  public saveCustomer() {
    if (!this.validation.validatePassword(this.customer.password)) {
      this.alert.error('Mật khẩu phải có nhiều hơn 6 kí tụ, có ít nhất 1 ký tự in hoa và 1 ký tự số');
      return;
    }
    this.loading.show();
    // this.company.phone = this.appCommon.getPhoneNumber(this.company.phone);
    this.customerService.save(this.customer).subscribe(res => this.saveCustomerCompleted(res));
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
