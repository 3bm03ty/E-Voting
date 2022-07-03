import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {
  baseURL = 'https://moproject.herokuapp.com/';
  numOfCandidates:any;

  constructor(private _HttpClient: HttpClient) { }
  getAllCandidates(): Observable<any> {
    let response = this._HttpClient.get(this.baseURL + 'candidates/');
    return response;
  }

  getCandidate(userId: any): Observable<any> {
    let response = this._HttpClient.get(this.baseURL + 'candidates/' + userId);
    return response;
  }
  

  addCandidate(registerForm: any): Observable<any> {
    let response = this._HttpClient.post(
      this.baseURL + 'candidates/',
      registerForm
    );
    return response;
  }

  updateCandidate(registerForm: any): Observable<any> {
    let response = this._HttpClient.put(this.baseURL + 'candidates/', registerForm);
    return response;
  }

  deleteCandidate(NID: any): Observable<any> {
    let response = this._HttpClient.delete(this.baseURL + 'candidates/', {
      body: { NID: NID },
    });
    return response;
  }

  uploadCandidateExcel(excel:any): Observable<any> {
    const formData = new FormData()
    formData.append("cand", excel, excel.name);
    return this._HttpClient.post(this.baseURL + 'candidates/excel',formData);
    // return response;
  }

  uploadCPic(img:any): Observable<any> {
    const formData = new FormData()
    formData.append("file", img, img.name);
    return this._HttpClient.post('https://routeegypt.com/pinkboatIMG/',formData);
  }
  uploadCLogo(img:any): Observable<any> {
    const formData:FormData = new FormData()
    formData.append("file", img, img.name);
    return this._HttpClient.post('https://routeegypt.com/pinkboatIMG/',formData);
  }


  
}
