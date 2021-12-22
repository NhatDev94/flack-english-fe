import { AfterViewInit, Component } from '@angular/core';
import { AppAlert, AppLoading, AppModals } from '../../../../../../shared/utils';
import { CompanyService } from '../../../../../../core/service/software/company.service';
import { BaseSearchModel } from '../../../../../../data/schema/search/base-search.model';
import { ResponseModel } from '../../../../../../data/schema/response.model';
import { HTTP_CODE_CONSTANT } from '../../../../../../core/constant/http-code.constant';
import { EmployeeModel } from '../../../../../../data/schema/employee.model';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService} from '../../../../../../core/service/software/employee.service'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
})
export class EmployeeComponent implements AfterViewInit {
  public search: BaseSearchModel<EmployeeModel[]> = new BaseSearchModel<EmployeeModel[]>();
  public employeeId: any
  public employee: EmployeeModel
  constructor(
    private modal: AppModals,
    private loading: AppLoading,
    private alert: AppAlert,
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {

  }

  vocabulary = [
    {
      id: '1',
      vocabulary: 'contract',
      type: 'n',
      meanContent: 'An arrangement, apromise or a contract made width sombody. ',
      example: 'Are you going to break the contract?',
      hackContent: 'Đưa tiền trước mà không làm hợp đồng thì còn trách ai'
    },
    {
      id: '2',
      vocabulary: 'contract',
      type: 'n',
      meanContent: 'An arrangement, apromise or a contract made width sombody. ',
      example: 'Are you going to break the contract?',
      hackContent: 'Đưa tiền trước mà không làm hợp đồng thì còn trách ai'
    },
    {
      id: '3',
      vocabulary: 'contract',
      type: 'n',
      meanContent: 'An arrangement, apromise or a contract made width sombody. ',
      example: 'Are you going to break the contract?',
      hackContent: 'Đưa tiền trước mà không làm hợp đồng thì còn trách ai'
    }
  ]

  ngOnInit() {
    if (this.route.snapshot.params['id']) {
      this.employeeId = this.route.snapshot.params['id']
    }
  }


  listCourse: any = []

  ngAfterViewInit() {
    this.getCompanies();
  }

  public deleteCompany(company: any) {
    this.modal.confirm('Bạn có muốn xoá công ty?', 'Xác nhận').subscribe(res => this.confirmDeleteCompany(res, company));
  }

  // public saveCompanyCompleteEvent() {
  //   this.search.currentPage = 0;
  //   this.getCompanies();
  // }

  public dataTableChange(searchChange: BaseSearchModel<EmployeeModel[]>) {
    this.search = searchChange;
    this.getCompanies();
  }

  private confirmDeleteCompany(state: boolean, company: EmployeeModel) {
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
    this.employeeService.find(this.search).subscribe(res => this.getEmployeesCompleted(res));
  }

  private getEmployeesCompleted(res: ResponseModel<BaseSearchModel<EmployeeModel[]>>) {
    this.loading.hide();
    if (res.status !== HTTP_CODE_CONSTANT.OK) {
      res.message.forEach(value => {
        this.alert.error(value);
      });
      return;
    }
    this.search = res.result;    
    this.search.result.map(item => {
      if (item.id === this.employeeId) this.employee = item
    })
  }
}
