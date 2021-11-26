import {Injectable} from '@angular/core';
import {SoftwareBaseService} from '../generic/software-base.service';
import {Observable} from 'rxjs';
import {BaseSearchModel} from '../../../data/schema/search/base-search.model';
import { EmployeeModel } from '../../../data/schema/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends SoftwareBaseService {
  public findAll(): Observable<any> {
    return this.get('/api/v1/company/findAll', {});
  }

  public find(search: BaseSearchModel<EmployeeModel[]>): Observable<any> {
    return this.post('/api/v1/company/findAll', search);
  }

  public getLikeNameOrSlugName(name: string): Observable<any> {
    return this.get('/api/v1/company/getLikeNameOrSlugName', {name});
  }

  public save(company: EmployeeModel): Observable<any> {
    return this.post('/api/v1/company/insert', company);
  }

  public update(company: EmployeeModel): Observable<any> {
    return this.put('/api/v1/company/update', company);
  }

  public deleteCompany(companyId: string): Observable<any> {
    return this.delete(`/api/v1/company/delete/${companyId}`);
  }
}
