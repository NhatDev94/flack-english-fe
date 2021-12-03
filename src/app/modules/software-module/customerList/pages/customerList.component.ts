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

  customer: any = [
    {
      id: '1',
      userName: 'Nguyen Van Nhat',
      email: 'nhatdev94@gmail.com',
      birthday: '2021-01-01',
      createdDate: '2021-01-01',
      lastUpdate: '2021-09-22',
      phoneNumber: '0963244816',
    },
    {
      id: '2',
      userName: 'Le Van Truong',
      email: 'nhatdev94@gmail.com',
      birthday: '2021-01-01',
      createdDate: '2021-01-01',
      lastUpdate: '2021-09-22',
      phoneNumber: '0963244816',
    },
    {
      id: '3',
      userName: 'Vu Van Thanh Do',
      email: 'nhatdev94@gmail.com',
      birthday: '2021-01-01',
      createdDate: '2021-01-01',
      lastUpdate: '2021-09-22',
      phoneNumber: '0963244816',
    },
    {
      id: '4',
      userName: 'Vu Van Thanh Do',
      email: 'nhatdev94@gmail.com',
      birthday: '2021-01-01',
      createdDate: '2021-01-01',
      lastUpdate: '2021-09-22',
      phoneNumber: '0963244816',
    },
    {
      id: Math.random(),
      userName: 'Vu Van Thanh Do',
      email: 'nhatdev94@gmail.com',
      birthday: '2021-01-01',
      createdDate: '2021-01-01',
      lastUpdate: '2021-09-22',
      phoneNumber: '0963244816',
    },
    
  ]

  ngAfterViewInit() {
    this.getCustomer();
  }

  public deleteCustomer(customer: any) {
    this.modal.confirm('Bạn có muốn xoá công ty?', 'Xác nhận').subscribe(res => this.confirmDeleteCustomer(res, customer));
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
    console.log(this.search);
    
  }
}
