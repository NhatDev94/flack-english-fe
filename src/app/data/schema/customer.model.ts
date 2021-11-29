export class CustomerModel {
    public id: string;
    public userName: string;
    public email: string;
    public phoneNumber: string;
    public password: string;
    public createdDate: string;
    public updatedDate: string;
  
    public constructor(data?: CustomerModel) {
      const customer = data == null ? this : data;
      this.id = customer.id;
      this.userName = customer.userName;
      this.email = customer.email;
      this.phoneNumber = customer.phoneNumber;
      this.password = customer.password;
      this.createdDate = customer.createdDate;
      this.updatedDate = customer.updatedDate;
    }
  }
  