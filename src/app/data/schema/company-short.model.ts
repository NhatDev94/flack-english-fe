export class CompanyShortModel {
  public id: string;
  public name: string;
  public nameSlug: string;
  public email: string;
  public phone: string;
  public address: string;
  public createdDate: string;
  public updatedDate: string;

  public constructor(data?: CompanyShortModel) {
    const company = data == null ? this : data;
    this.id = company.id;
    this.name = company.name;
    this.nameSlug = company.nameSlug;
    this.email = company.email;
    this.phone = company.phone;
    this.address = company.address;
    this.createdDate = company.createdDate;
    this.updatedDate = company.updatedDate;
  }
}
