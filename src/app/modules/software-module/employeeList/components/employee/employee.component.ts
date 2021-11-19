import {AfterViewInit, Component} from '@angular/core';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
})
export class EmployeeComponent implements AfterViewInit {
  // public search: BaseSearchModel<CompanyModel[]> = new BaseSearchModel<CompanyModel[]>();

  constructor(
    // private modal: AppModals,
    // private loading: AppLoading,
    // private alert: AppAlert,
    // private companyService: CompanyService
  ) {
  }

  listCourse = [
    {
      id: '1',
      course: 'TOIC',
      timeFacvorite: '9h',
      timeTotal: '210',
      wordTotal: '2300'
    },
    {
      id: '1',
      course: 'TOIC',
      timeFacvorite: '9h',
      timeTotal: '210',
      wordTotal: '2300'
    },
    {
      id: '1',
      course: 'TOIC',
      timeFacvorite: '9h',
      timeTotal: '210',
      wordTotal: '2300'
    },
    
  ]


  ngAfterViewInit() {
    // this.getCompanies();
  }

 
}
