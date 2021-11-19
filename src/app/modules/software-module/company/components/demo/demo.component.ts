import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {CompanyModel} from '../../../../../data/schema/company.model';
import {AppModalWrapperComponent} from '../../../../../shared/components/modal-wrapper/app-modal-wrapper.component';
import {ResponseModel} from '../../../../../data/schema/response.model';
import {HTTP_CODE_CONSTANT} from '../../../../../core/constant/http-code.constant';
import {AppAlert, AppLoading} from '../../../../../shared/utils';
import {AppValidation} from '../../../../../shared/utils/app-validation';
import {AppCommon} from '../../../../../shared/utils/app-common';
import {CompanyService} from '../../../../../core/service/software/company.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
})
export class DemoComponent {
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

}
