export class EmployeeModel {
  public id: string;
  public email: string;
  public userName: string;
  public firstName: string;
  public lastName: string;
  public createdDate: string;
  public lastUpdate: string;
  public password: string;
  public phoneNumber: string;
  public birthday: string;

  public constructor(data?: EmployeeModel) {
    const employee = data == null ? this : data;
    this.id = employee.id;
    this.email = employee.email;
    this.userName = employee.userName;
    this.firstName = employee.firstName;
    this.lastName = employee.lastName;
    this.createdDate = employee.createdDate;
    this.lastUpdate = employee.lastUpdate;
    this.password = employee.password;
    this.phoneNumber = employee.phoneNumber;
    this.birthday = employee.birthday;
  }
}
