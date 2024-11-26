import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeRequestsService {
  private readonly serverUrl: string = 'http://localhost:8080/account-requests';

  constructor(private readonly httpClient: HttpClient) {}

  public fetchPendingEmployees(token: string) {
    let headers = new HttpHeaders({
      Authorization: token,
    });

    return this.httpClient.get(this.serverUrl + '/employees', {
      headers,
    });
  }

  public fetchPendingManagers(token: string) {
    let headers = new HttpHeaders({
      Authorization: token,
    });

    return this.httpClient.get(this.serverUrl + '/managers', {
      headers,
    });
  }

  public handleEmployeeRequest(
    token: string,
    accountAccepted: boolean,
    accountId: number
  ) {
    let headers = new HttpHeaders({
      Authorization: token,
    });

    return this.httpClient.post(
      this.serverUrl + '/handle-employee',
      {
        accountId,
        accountAccepted,
      },
      {
        headers,
      }
    );
  }

  public handleManagerRequest(
    token: string,
    accountAccepted: boolean,
    accountId: number
  ) {
    let headers = new HttpHeaders({
      Authorization: token,
    });

    console.log({
      accountAccepted,
      accountId,
    });

    return this.httpClient.post(
      this.serverUrl + '/handle-manager',
      {
        accountId,
        accountAccepted,
      },
      {
        headers,
      }
    );
  }
}
