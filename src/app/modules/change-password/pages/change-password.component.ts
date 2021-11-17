import {AppAlert, AppLoading} from '../../../shared/utils';
import {HTTP_CODE_CONSTANT} from '../../../core/constant/http-code.constant';
import {ChangePasswordModel} from '../../../data/schema/change-password.model';
import {ResponseModel} from '../../../data/schema/response.model';
import {Router} from '@angular/router';
import {JwtResponseModel} from '../../../data/schema/jwt-response.model';
import {Component} from '@angular/core';
import {AppValidation} from '../../../shared/utils/app-validation';

declare var $: any;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent {

  public changePasswordModel: ChangePasswordModel = new ChangePasswordModel();

  constructor(
    private loading: AppLoading,
    private alert: AppAlert,
    private router: Router,
    private validation: AppValidation
  ) {
    $('body').addClass('login-page adi-background-guest');
  }

  public enterEvent($keyBoard: KeyboardEvent = null) {
    if ($keyBoard != null && $keyBoard.key === 'Enter') {
      this.changePassword();
    }
  }

  public changePassword() {
    if (this.changePasswordModel.newPassword !== this.changePasswordModel.confirmation) {
      this.alert.error('Re-type password is not match the new password');
      return;
    }

    if (!this.validation.validatePassword(this.changePasswordModel.oldPassword)) {
      this.alert.error('The old password should be more than 6 characters, has at least one uppercase and one number');
      return;
    }

    if (!this.validation.validatePassword(this.changePasswordModel.newPassword)) {
      this.alert.error('The new password should be more than 6 characters, has at least one uppercase and one number');
      return;
    }

    this.loading.show();
    // this.employeeService.changePassword(this.changePasswordModel).subscribe(res => this.changePasswordCompleted(res));
  }

  public back() {
    this.router.navigateByUrl('/store');
  }

  private changePasswordCompleted(res: ResponseModel<JwtResponseModel>) {
    this.loading.hide();
    if (res.status !== HTTP_CODE_CONSTANT.OK) {
      res.message.forEach(value => {
        this.alert.error(value);
      });
      return;
    }

    this.alert.success(res.message[0]);
    this.router.navigateByUrl('/');
  }
}
