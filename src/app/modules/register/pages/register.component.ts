import {HTTP_CODE_CONSTANT} from '../../../core/constant/http-code.constant';
import {RegisterModel} from '../../../data/schema/register.model';
import {Router} from '@angular/router';
import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {LoginSearchLazyModel} from '../../../data/schema/search/login-search-lazy.model';
import {AppAlert, AppLoading} from '../../../shared/utils';
import {debounceTime} from 'rxjs/operators';
import {fromEvent, Subscription} from 'rxjs';
import {ResponseModel} from '../../../data/schema/response.model';
import {JwtResponseModel} from '../../../data/schema/jwt-response.model';
import {AUTH_CONSTANT} from '../../../core/constant/auth.constant';
import {AuthService} from '../../../core/service/generic/auth.service';

declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements AfterViewInit, OnDestroy {
  public isSearched = false;
  public isSearching = false;
  public registerModel: RegisterModel = new RegisterModel();
  public loginSearches: LoginSearchLazyModel = new LoginSearchLazyModel();
  private el: any;
  private elDropdown: any;
  private usernameSub: Subscription;

  constructor(
    private loading: AppLoading,
    private alert: AppAlert,
    private router: Router,
    private authServices: AuthService
  ) {
    $('body').addClass('login-page adi-background-guest');
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {}

  public enterEvent($keyBoard: KeyboardEvent = null) {
    if ($keyBoard != null && $keyBoard.key === 'Enter') {
      this.register();
    }
  }

  public register() {
    console.log(this.registerModel);
    this.loading.show();
    this.authServices.register(this.registerModel).subscribe(res=> this.registerCompleted(res));
  }

  private registerCompleted(res: ResponseModel<JwtResponseModel>) {
    this.loading.hide();
    // if (res.status !== HTTP_CODE_CONSTANT.OK) {
    //   res.message.forEach(value => {
    //     this.alert.error(value);
    //   });
    //   return;
    // }

    // Loi khong message undefine

    // const user = res.result.user;
    // localStorage.setItem(AUTH_CONSTANT.USER_DATA, JSON.stringify(user));

    this.router.navigateByUrl('/login');
    
    setTimeout(() => {
      this.loading.hide();
    });
  }
}
