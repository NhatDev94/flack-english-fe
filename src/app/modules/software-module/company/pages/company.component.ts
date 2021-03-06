import {AfterViewInit, Component} from '@angular/core';
import {AppAlert, AppLoading, AppModals} from '../../../../shared/utils';
import {CompanyService} from '../../../../core/service/software/company.service';
import {BaseSearchModel} from '../../../../data/schema/search/base-search.model';
import {ResponseModel} from '../../../../data/schema/response.model';
import {HTTP_CODE_CONSTANT} from '../../../../core/constant/http-code.constant';
import {CompanyModel} from '../../../../data/schema/company.model';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
})
export class CompanyComponent implements AfterViewInit {
  public search: BaseSearchModel<CompanyModel[]> = new BaseSearchModel<CompanyModel[]>();

  constructor(
    private modal: AppModals,
    private loading: AppLoading,
    private alert: AppAlert,
    private companyService: CompanyService
  ) {
  }

  ngAfterViewInit() {
    this.getCompanies();
  }

  public deleteCompany(company: any) {
    this.modal.confirm('Bạn có muốn xoá công ty?', 'Xác nhận').subscribe(res => this.confirmDeleteCompany(res, company));
  }

  public saveCompanyCompleteEvent() {
    this.search.currentPage = 0;
    this.getCompanies();
  }

  public dataTableChange(searchChange: BaseSearchModel<CompanyModel[]>) {
    this.search = searchChange;
    this.getCompanies();
  }

  private confirmDeleteCompany(state: boolean, company: CompanyModel) {
    if (state) {
      this.loading.show();
      this.companyService.deleteCompany(company.id).subscribe(res => this.confirmDeleteCompanyCompleted(res));
    }
  }

  private confirmDeleteCompanyCompleted(res: ResponseModel<any>) {
    this.loading.hide();
    if (res.status !== HTTP_CODE_CONSTANT.OK) {
      res.message.forEach(value => {
        this.alert.error(value);
      });
      return;
    }

    this.alert.success(res.message[0]);
    this.getCompanies();
  }

  private getCompanies() {
    this.loading.show();
    this.companyService.find(this.search).subscribe(res => this.getCompaniesCompleted(res));
  }

  private getCompaniesCompleted(res: ResponseModel<BaseSearchModel<CompanyModel[]>>) {
    this.loading.hide();
    if (res.status !== HTTP_CODE_CONSTANT.OK) {
      res.message.forEach(value => {
        this.alert.error(value);
      });
      return;
    }

    this.search = res.result;
  }
}
