import {HTTP_CODE_CONSTANT} from '../../../core/constant/http-code.constant';
import {LoginModel} from '../../../data/schema/login.model';
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
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements AfterViewInit, OnDestroy {
  public isSearched = false;
  public isSearching = false;
  public loginModel: LoginModel = new LoginModel();
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
      this.login();
    }
  }

  public login() {
    this.loading.show();
    this.authServices.login(this.loginModel.username, this.loginModel.password).subscribe(res=> this.loginCompleted(res));
    // lay duoc user va pass nhung ko login duoc
  }

  private loginCompleted(res: ResponseModel<JwtResponseModel>) {
    console.log(res);
    // Khong login duoc -> comment doan nay lai
    this.loading.hide();
    if (res.status !== HTTP_CODE_CONSTANT.OK) {
      res.message.forEach(value => {
        this.alert.error(value);
      });
      return;
    }

    const user = res.result.user;
    localStorage.setItem(AUTH_CONSTANT.USER_DATA, JSON.stringify(user));

    this.router.navigateByUrl('/');
    setTimeout(() => {
      this.loading.hide();
    });
  }
}
