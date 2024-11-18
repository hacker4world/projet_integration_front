export class EmployeeSignup {
  name: string;
  lastName: string;
  age: number;
  RIB: number;
  adress: string;
  role_employer: string;
  email: string;
  password: string;

  constructor(
    name: string,
    lastName: string,
    age: number,
    RIB: number,
    adress: string,
    role_employer: string,
    email: string,
    password: string
  ) {
    this.name = name;
    this.lastName = lastName;
    this.age = age;
    this.RIB = RIB;
    this.adress = adress;
    this.role_employer = role_employer;
    this.email = email;
    this.password = password;
  }
}
