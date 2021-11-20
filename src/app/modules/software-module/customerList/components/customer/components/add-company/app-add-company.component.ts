import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {CompanyModel} from '../../../../../../../data/schema/company.model';
import {AppModalWrapperComponent} from '../../../../../../../shared/components/modal-wrapper/app-modal-wrapper.component';
import {ResponseModel} from '../../../../../../../data/schema/response.model';
import {HTTP_CODE_CONSTANT} from '../../../../../../../core/constant/http-code.constant';
import {AppAlert, AppLoading} from '../../../../../../../shared/utils';
import {AppValidation} from '../../../../../../../shared/utils/app-validation';
import {AppCommon} from '../../../../../../../shared/utils/app-common';
import {CompanyService} from '../../../../../../../core/service/software/company.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './app-add-company.component.html',
})
export class AppAddCompanyComponent {
  @Output() saveCompleteEvent: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('appModalWrapper', {static: true}) appModalWrapper: AppModalWrapperComponent;
  public company: CompanyModel = new CompanyModel();

  constructor(
    private alert: AppAlert,
    private loading: AppLoading,
    private companyService: CompanyService,
    private validation: AppValidation,
    private appCommon: AppCommon
  ) {
  }

  public show() {
    this.company = new CompanyModel();
    this.appModalWrapper.show();
  }

  public hide() {
    this.appModalWrapper.hide();
  }

  public companyNameChange() {
    if (this.company.name) {
      const nameSlug = this.company.name.trim().toLocaleLowerCase().replace(/ /g, '-');
      this.company.nameSlug = nameSlug;
    }
  }

  public saveCompany() {
    if (!this.validation.validatePassword(this.company.password)) {
      this.alert.error('Mật khẩu phải có nhiều hơn 6 kí tụ, có ít nhất 1 ký tự in hoa và 1 ký tự số');
      return;
    }
    this.loading.show();

    this.company.phone = this.appCommon.getPhoneNumber(this.company.phone);
    this.companyService.save(this.company).subscribe(res => this.saveCompanyCompleted(res));
  }

  private saveCompanyCompleted(res: ResponseModel<CompanyModel>) {
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
