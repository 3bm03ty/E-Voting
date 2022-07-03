import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VotesService {
  baseURL = 'https://moproject.herokuapp.com/';
  constructor(private _HttpClient: HttpClient) {}

  getAllVotes(): Observable<any> {
    return this._HttpClient.get(this.baseURL + 'votes/');
  }
// "62bb7587dadc0e69aa8d74d8"
  getCandidateVoter(CID: any): Observable<any> {
    let response = this._HttpClient.get(this.baseURL + 'votes/time' , CID);
    return response;
  }
}
