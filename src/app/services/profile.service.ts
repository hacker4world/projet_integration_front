import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getProfileDetails(userId: number, token: string): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: token,
    });

    return this.http.get(`${this.apiUrl}/profile/details/${userId}`, {
      headers,
    });
  }
}
