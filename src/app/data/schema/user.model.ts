export class UserModel {
  public id: number | string;
  public firstName = 'Guest';
  public lastName = '';
  public phone: string;
  public password: string;
  public userModel: string;
  public permissions: string[];

  public constructor(
    data?: UserModel
  ) {
    const user = data == null ? this : data;

    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.phone = user.phone;
    this.password = user.password;
    this.userModel = user.userModel;
    this.permissions = user.permissions || [];
  }
}
