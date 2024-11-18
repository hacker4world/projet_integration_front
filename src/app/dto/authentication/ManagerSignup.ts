export class ManagerSignup {
  name: string;
  lastName: string;
  age: number;
  RIB: number;
  adress: string;
  grade: string;
  email: string;
  password: string;

  constructor(
    name: string,
    lastName: string,
    age: number,
    RIB: number,
    adress: string,
    grade: string,
    email: string,
    password: string
  ) {
    this.name = name;
    this.lastName = lastName;
    this.age = age;
    this.RIB = RIB;
    this.adress = adress;
    this.grade = grade;
    this.email = email;
    this.password = password;
  }
}
