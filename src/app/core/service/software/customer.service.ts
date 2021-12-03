import {Injectable} from '@angular/core';
import {SoftwareBaseService} from '../generic/software-base.service';
import {Observable} from 'rxjs';
import {BaseSearchModel} from '../../../data/schema/search/base-search.model';
import {CustomerModel} from '../../../data/schema/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends SoftwareBaseService {
  public findAll(): Observable<any> {
    return this.get('/api/v1/customer/findAll', {});
  }

  public find(search: BaseSearchModel<CustomerModel[]>): Observable<any> {
    return this.post('/api/v1/customer/findAll', search);
  }

  public getLikeNameOrSlugName(name: string): Observable<any> {
    return this.get('/api/v1/customer/getLikeNameOrSlugName', {name});
  }

  public save(customer: CustomerModel): Observable<any> {
    return this.post('/api/v1/customer/insert', customer);
  }

  public update(customer: CustomerModel): Observable<any> {
    return this.put('/api/v1/customer/update', customer);
  }

  public deleteCustomer(customerId: string): Observable<any> {
    return this.delete(`/api/v1/customer/delete/${customerId}`);
  }
}
