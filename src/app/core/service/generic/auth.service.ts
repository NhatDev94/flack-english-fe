import { Observable } from 'rxjs';
import {SoftwareBaseService} from './software-base.service';
import {ResponseModel} from '../../../data/schema/response.model';
import {JwtResponseModel} from '../../../data/schema/jwt-response.model';
import { Injectable } from '@angular/core';
import { RegisterModel } from 'src/app/data/schema/register.model';

const subUrl = '/api/v1/';

@Injectable({
    providedIn: 'root'
  })

export class AuthService extends SoftwareBaseService{
    public login(userName: String, password: String ): Observable<any>{
        const user = {userName: userName, password: password};
        return this.post(subUrl + 'auth/login', user);
    }

    public register(user: RegisterModel ): Observable<any>{  
      console.log(user);
      
        return this.post(subUrl + 'auth/register', user);
    }
}