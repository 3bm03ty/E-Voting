import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VotingService {
  baseURL = 'https://moproject.herokuapp.com/';

  route: any;
  constructor(private _HttpClient: HttpClient) {}

  getMatching(): Observable<any> {
    let response = this._HttpClient.get(this.baseURL + 'matching/');
    return response;
  }

  resetMatching(): Observable<any> {
    let response = this._HttpClient.post(this.baseURL + 'matching/', {
      matching: '',
    });
    return response;
  }
  getTemplate(): Observable<any> {
    let response = this._HttpClient.get(this.baseURL + 'templates/');
    return response;
  }

  resetTemplate(): Observable<any> {
    let response = this._HttpClient.post(this.baseURL + 'templates/', {
      template: '',
    });
    return response;
  }

  uploadVoterExcel(excel:any): Observable<any> {
    const formData = new FormData()
    formData.append("voter", excel, excel.name);
    return this._HttpClient.post(this.baseURL + 'voters/excel',formData);
    // return response;
  }

  vote(CID:any,VID:any):Observable<any>{
    console.log(CID,VID);
    
    return this._HttpClient.post(this.baseURL + 'votes',{
      "CID":CID,
      "VID":VID
    });
  }
  
}
