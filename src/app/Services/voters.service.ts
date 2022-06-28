import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VotersService {
  baseURL = 'https://moproject.herokuapp.com/';

  voter: any;
  constructor(private _HttpClient: HttpClient) {}

  getVoter(userId: any): Observable<any> {
    let response = this._HttpClient.get(this.baseURL + 'voters/' + userId);
    return response;
  }

  addVoter(registerForm: any): Observable<any> {
    let response = this._HttpClient.post(
      this.baseURL + 'voters/',
      registerForm
    );
    return response;
  }

  updateVoter(registerForm: any): Observable<any> {
    let response = this._HttpClient.put(this.baseURL + 'voters/', registerForm);
    return response;
  }

  deleteVoter(NID: any): Observable<any> {
    let response = this._HttpClient.delete(this.baseURL + 'voters/', {
      body: { NID: NID },
    });
    return response;
  }

  uploadVoterExcel(excel:any): Observable<any> {
    const formData = new FormData()
    formData.append("voter", excel, excel.name);
    return this._HttpClient.post(this.baseURL + 'voters/excel',formData);
    // return response;
  }
 
}
