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
  public employee: any
  constructor(
    private modal: AppModals,
    private loading: AppLoading,
    private alert: AppAlert,
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {
  }

  ngOnInit() {
    if (this.route.snapshot.params['id']) {
      this.employeeId = this.route.snapshot.params['id']
    }
  }

  listCourse: any = []

  customer: any = [
    {
      id: '1',
      userName: 'Nguyen Van Nhat',
      email: 'nhatdev94@gmail.com',
      birthday: '1994-09-21',
      createdDate: '2021-11-22',
      lastUpdate: '2021-12-02',
      phoneNumber: '0963244816'
    }
  ]

  ngAfterViewInit() {
    this.getCompanies();
    console.log('asdas');
    
    this.employeeService.getEmployeeById(this.employeeId).subscribe(res => this.getEmployeesCompleted(res))
    // Chuaw duoc
    // 1. loi message null
    // 2. GET tra ve 400
  }

  public deleteCompany(company: any) {
    this.modal.confirm('Bạn có muốn xoá công ty?', 'Xác nhận').subscribe(res => this.confirmDeleteCompany(res, company));
  }

  public saveCompanyCompleteEvent() {
    this.search.currentPage = 0;
    this.getCompanies();
  }

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

  }
}
