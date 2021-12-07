import {AfterViewInit, Component} from '@angular/core';
import {AppAlert, AppLoading, AppModals} from '../../../../shared/utils';
import {EmployeeService} from '../../../../core/service/software/employee.service';
import {BaseSearchModel} from '../../../../data/schema/search/base-search.model';
import {ResponseModel} from '../../../../data/schema/response.model';
import {HTTP_CODE_CONSTANT} from '../../../../core/constant/http-code.constant';
import {EmployeeModel} from '../../../../data/schema/employee.model';

@Component({
  selector: 'app-employeeList',
  templateUrl: './employeeList.component.html',
})
export class EmployeeListComponent implements AfterViewInit {
  public search: BaseSearchModel<EmployeeModel[]> = new BaseSearchModel<EmployeeModel[]>();

  constructor(
    private modal: AppModals,
    private loading: AppLoading,
    private alert: AppAlert,
    private employeeService: EmployeeService
  ) {
  }


  ngAfterViewInit() {
    this.getEmployees();
  }

  public deleteEmployee(employee: any) {
    this.modal.confirm('Bạn có muốn xoá nhân viên?', 'Xác nhận').subscribe(res => this.confirmDeleteEmployee(res, employee));
  }

  public saveEmployeeCompleteEvent() {
    this.search.currentPage = 0;
    this.getEmployees();
  }

  public dataTableChange(searchChange: BaseSearchModel<EmployeeModel[]>) {
    this.search = searchChange;
    this.getEmployees();
  }

  private confirmDeleteEmployee(state: boolean, employee: EmployeeModel) {
    if (state) {
      this.loading.show();
      this.employeeService.deleteEmployee(employee.id).subscribe(res => this.confirmDeleteEmployeeCompleted(res));
    }
  }

  private confirmDeleteEmployeeCompleted(res: ResponseModel<any>) {
    this.loading.hide();
    if (res.status !== HTTP_CODE_CONSTANT.OK) {
      res.message.forEach(value => {
        this.alert.error(value);
      });
      return;
    }

    this.alert.success(res.message[0]);
    this.getEmployees();
  }

  private getEmployees() {
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
