export class CompanyModel {
  public id: string;
  public name: string;
  public nameSlug: string;
  public email: string;
  public phone: string;
  public address: string;
  public password: string;
  public verifyStatus = true;
  public createdDate: string;
  public updatedDate: string;

  public constructor(data?: CompanyModel) {
    const company = data == null ? this : data;
    this.id = company.id;
    this.name = company.name;
    this.nameSlug = company.nameSlug;
    this.email = company.email;
    this.phone = company.phone;
    this.address = company.address;
    this.password = company.password;
    this.verifyStatus = company.verifyStatus;
    this.createdDate = company.createdDate;
    this.updatedDate = company.updatedDate;
  }
}
