import { AfterViewInit, Component } from '@angular/core';
import { AppAlert, AppLoading, AppModals } from '../../../../../../shared/utils';
import { CustomerService } from '../../../../../../core/service/software/customer.service';
import { BaseSearchModel } from '../../../../../../data/schema/search/base-search.model';
import { ResponseModel } from '../../../../../../data/schema/response.model';
import { HTTP_CODE_CONSTANT } from '../../../../../../core/constant/http-code.constant';
import { ActivatedRoute } from '@angular/router';
import { CustomerModel } from 'src/app/data/schema/customer.model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
})
export class CustomerComponent implements AfterViewInit {
  public search: BaseSearchModel<CustomerModel[]> = new BaseSearchModel<CustomerModel[]>();
  public customerId: any
  public customer: CustomerModel
  constructor(
    private modal: AppModals,
    private loading: AppLoading,
    private alert: AppAlert,
    private customerService: CustomerService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    if (this.route.snapshot.params['id']) {
      this.customerId = this.route.snapshot.params['id']
    }
  }

  listCourse: any = [
    {
      id: '1',
      course: 'TOIC',
      timeFavorite: '9h',
      timeTotal: '322',
      wordTotal: '1200'
    },
    {
      id: '2',
      course: 'TOIC',
      timeFavorite: '9h',
      timeTotal: '322',
      wordTotal: '1200'
    },
    {
      id: '3',
      course: 'TOIC',
      timeFavorite: '9h',
      timeTotal: '322',
      wordTotal: '1200'
    },
    {
      id: '4',
      course: 'TOIC',
      timeFavorite: '9h',
      timeTotal: '322',
      wordTotal: '1200'
    },
    {
      id: '5',
      course: 'TOIC',
      timeFavorite: '9h',
      timeTotal: '322',
      wordTotal: '1200'
    },
  ]



  ngAfterViewInit() {
    this.getCustomers();
  }

  public deleteCustomer(company: any) {
    this.modal.confirm('Bạn có muốn xoá công ty?', 'Xác nhận').subscribe(res => this.confirmDeleteCustomer(res, company));
  }

  public saveCustomerCompleteEvent() {
    this.search.currentPage = 0;
    this.getCustomers();
  }

  public dataTableChange(searchChange: BaseSearchModel<CustomerModel[]>) {
    this.search = searchChange;
    this.getCustomers();
  }

  private confirmDeleteCustomer(state: boolean, company: CustomerModel) {
    if (state) {
      this.loading.show();
      this.customerService.deleteCustomer(company.id).subscribe(res => this.confirmDeleteCustomerCompleted(res));
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
    this.getCustomers();
  }

  private getCustomers() {
    this.loading.show();
    this.customerService.find(this.search).subscribe(res => this.getCustomersCompleted(res));
  }

  private getCustomersCompleted(res: ResponseModel<BaseSearchModel<CustomerModel[]>>) {
    this.loading.hide();
    if (res.status !== HTTP_CODE_CONSTANT.OK) {
      res.message.forEach(value => {
        this.alert.error(value);
      });
      return;
    }

    this.search = res.result;
    
    
    
    this.search.result.map(item => {
      if (item.id === this.customerId) this.customer = item
    })
  }
}
