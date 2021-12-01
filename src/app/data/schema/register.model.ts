export class RegisterModel {
  avatarUrl: string;
  birthday: string;
  createdDate: string;
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  updatedDate: string;

  public constructor(data?: RegisterModel) {
    const register = data == null ? this : data;
    this.avatarUrl = register.avatarUrl;
    this.birthday = "2021-11-14T10:01:36.597Z";
    this.createdDate = "2021-11-14T10:01:36.597Z";
    this.email = register.email;
    this.userName = register.userName;
    this.firstName = register.firstName;
    this.lastName = register.lastName;
    this.password = register.password;
    this.phoneNumber = register.phoneNumber;
    this.updatedDate = "2021-11-14T10:01:36.597Z";
  }
  }
  