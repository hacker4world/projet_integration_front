import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeSignup } from '../dto/authentication/EmployeeSignup';
import { ManagerSignup } from '../dto/authentication/ManagerSignup';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private readonly httpClient: HttpClient) {}

  private serverUrl: string = 'http://localhost:8080/';

  public employeeSignup(employeeSignupData: EmployeeSignup) {}

  public managerSignup(managerSignup: ManagerSignup) {}
}
