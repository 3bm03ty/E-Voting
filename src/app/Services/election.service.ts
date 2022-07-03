import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ElectionService {
  baseURL = 'https://moproject.herokuapp.com/';
  name = '';
  start = '';
  end = '';

  constructor(private _HttpClient: HttpClient) {}

  addElection(electionForm: any): Observable<any> {
    let response = this._HttpClient.post(
      this.baseURL + 'elections/',
      electionForm
    );
    return response;
  }
  updateElection(electionForm: any): Observable<any> {
    let response = this._HttpClient.put(
      this.baseURL + 'elections/',
      electionForm
    );
    return response;
  }
  deleteElection(electionForm: any): Observable<any> {
    let response = this._HttpClient.delete(
      this.baseURL + 'elections/',
      electionForm
    );
    return response;
  }
}
