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
    return this.get('/api/v1/employee/findAll', {});
  }

  public find(search: BaseSearchModel<EmployeeModel[]>): Observable<any> {
    return this.post('/api/v1/employee/findAll', search);
  }

  public getLikeNameOrSlugName(name: string): Observable<any> {
    return this.get('/api/v1/employee/getLikeNameOrSlugName', {name});
  }

  public save(employee: EmployeeModel): Observable<any> {
    return this.post('/api/v1/employee/insert', employee);
  }

  public update(employee: EmployeeModel): Observable<any> {
    return this.put('/api/v1/employee/update', employee);
  }

  public deleteEmployee(employeeId: string): Observable<any> {
    return this.delete(`/api/v1/employee/${employeeId}`);
  }

  public getEmployeeById(id: any) {
    return this.get('/api/v1/employee/getById', {});
  }
}
