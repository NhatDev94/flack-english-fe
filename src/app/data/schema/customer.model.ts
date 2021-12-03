export class CustomerModel {
  public id: string
  public avatarUrl: string;
  public email: string;
  public userName: string;
  public firstName: string;
  public lastName: string;
  public createdDate: string;
  public updatedDate: string;
  public password: string;
  public phoneNumber: string;
  public birthday: string;
  public facebookId: string;
  public favoriteTime: string;
  public learnTime: string;
  public vocabularyNumber: number


  public constructor(data?: CustomerModel) {
    const customer = data == null ? this : data;
    this.id = customer.id;
    this.avatarUrl = "https://scontent.fvca1-2.fna.fbcdn.net/v/t39.30808-6/253363208_3050324271870990_7941200138105446742_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=iHJzFH4JTUMAX_W_zxB&_nc_ht=scontent.fvca1-2.fna&oh=5e73a654eb5ac5210915f387fdce8ded&oe=6197C02A"
    this.email = customer.email;
    this.userName = customer.userName;
    this.firstName = customer.firstName;
    this.lastName = customer.lastName;
    this.createdDate = "2021-12-03T04:41:01.400Z";
    this.updatedDate = "2021-12-03T04:41:01.400Z";
    this.password = customer.password;
    this.phoneNumber = customer.phoneNumber;
    this.birthday = "2021-12-03T04:41:01.400Z";
    this.facebookId = customer.facebookId;
    this.favoriteTime = customer.favoriteTime;
    this.learnTime = customer.learnTime;
    this.vocabularyNumber = this.vocabularyNumber
  }
}
