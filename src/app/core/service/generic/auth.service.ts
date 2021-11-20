import { Observable } from 'rxjs';
import {SoftwareBaseService} from './software-base.service';
import {ResponseModel} from '../../../data/schema/response.model';
import {JwtResponseModel} from '../../../data/schema/jwt-response.model';

const subUrl = '/api/v1/';

export class AuthService extends SoftwareBaseService{
    public login(userName: String, password: String ): Observable<any>{
        const user = {userName: userName, password: password};
        return this.post(subUrl + 'auth/login', user);
    }
}