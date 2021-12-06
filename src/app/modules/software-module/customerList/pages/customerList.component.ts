import {AfterViewInit, Component} from '@angular/core';
import {AppAlert, AppLoading, AppModals} from '../../../../shared/utils';
import {CustomerService} from '../../../../core/service/software/customer.service';
import {BaseSearchModel} from '../../../../data/schema/search/base-search.model';
import {ResponseModel} from '../../../../data/schema/response.model';
import {HTTP_CODE_CONSTANT} from '../../../../core/constant/http-code.constant';
import {CustomerModel} from '../../../../data/schema/customer.model';

@Component({
  selector: 'app-customerList',
  templateUrl: './customerList.component.html',
})
export class CustomerListComponent implements AfterViewInit {
  public search: BaseSearchModel<CustomerModel[]> = new BaseSearchModel<CustomerModel[]>();

  constructor(
    private modal: AppModals,
    private loading: AppLoading,
    private alert: AppAlert,
    private customerService: CustomerService
  ) {
  }

  ngAfterViewInit() {
    this.getCustomer();
  }

  public deleteCustomer(customer: any) {
    this.modal.confirm('Bạn có muốn xoá khách hàng?', 'Xác nhận').subscribe(res => this.confirmDeleteCustomer(res, customer));
  }

  public saveCustomerCompleteEvent() {
    this.search.currentPage = 0;
    this.getCustomer();
  }

  public dataTableChange(searchChange: BaseSearchModel<CustomerModel[]>) {
    this.search = searchChange;
    this.getCustomer();
  }

  private confirmDeleteCustomer(state: boolean, customer: CustomerModel) {
    if (state) {
      this.loading.show();
      this.customerService.deleteCustomer(customer.id).subscribe(res => this.confirmDeleteCustomerCompleted(res));
    }
  }

  private confirmDeleteCustomerCompleted(res: ResponseModel<any>) {
    this.loading.hide();
    if (res.status !== HTTP_CODE_CONSTANT.OK) {
      res.message.forEach(value => {
        this.alert.error(value);
      });
      return;
    }

    this.alert.success(res.message[0]);
    this.getCustomer();
  }

  private getCustomer() {
    this.loading.show();
    this.customerService.find(this.search).subscribe(res => this.getCustomerCompleted(res));
  }

  private getCustomerCompleted(res: ResponseModel<BaseSearchModel<CustomerModel[]>>) {
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
