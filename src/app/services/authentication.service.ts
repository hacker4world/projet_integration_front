import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeSignup } from '../dto/authentication/EmployeeSignup';
import { ManagerSignup } from '../dto/authentication/ManagerSignup';
import { Login } from '../dto/authentication/Login';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private readonly httpClient: HttpClient) {}

  private serverUrl: string = 'http://localhost:8080/authentication';

  public employeeSignup(signupData: EmployeeSignup | ManagerSignup) {
    return this.httpClient.post(this.serverUrl + '/signup', {
      ...signupData,
      accountType: 'employee',
    });
  }

  public managerSignup(signupData: EmployeeSignup | ManagerSignup) {
    return this.httpClient.post(this.serverUrl + '/signup', {
      ...signupData,
      accountType: 'manager',
    });
  }

  public verifyEmail(email: string, code: string) {
    return this.httpClient.post(this.serverUrl + '/verify-email', {
      code,
      email,
    });
  }

  public login(loginData: Login) {
    return this.httpClient.post(this.serverUrl + '/login', loginData);
  }

  public sendResetEmail(email: string) {
    return this.httpClient.post(this.serverUrl + '/send-password-reset-email', {
      email,
    });
  }

  public resetPassword(resetCode: string, email: string, newPassword: string) {
    return this.httpClient.post(this.serverUrl + '/reset-password', {
      resetCode,
      email,
      newPassword,
    });
  }
}
