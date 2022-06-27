import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {
  baseURL = 'https://moproject.herokuapp.com/';

  constructor(private _HttpClient: HttpClient) { }
  getAllCandidates(): Observable<any> {
    let response = this._HttpClient.get(this.baseURL + 'candidates/');
    return response;
  }
  
}
