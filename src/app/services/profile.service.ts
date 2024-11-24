import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getProfileDetails(userId: number):Observable<any> {
    return this.http.get(`${this.apiUrl}/profile/details/${userId}`);
  }

  updateProfile(profileData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile/update`, profileData);

  }
  uploadImage(file: File,userId:number):Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId',userId.toString());
    return this.http.post(`${this.apiUrl}/image/update`, formData);
  }
  getImage(userId:number):Observable<Blob> {
    return this.http.get(`${this.apiUrl}/image/get/${userId}`,{responseType:"blob"
    });
  }


}
