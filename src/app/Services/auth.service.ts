import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL = 'https://moproject.herokuapp.com/';

  constructor(private _HttpClient: HttpClient) {}

  register(registerFormValue: object): Observable<any> {
    let x = this._HttpClient.post(this.baseURL + 'votars/', registerFormValue);
    console.log(registerFormValue);
    return x;
  }

  

  setTemplete(templete: any): Observable<any> {
    let response = this._HttpClient.post(this.baseURL + 'templates',templete);
    // console.log(user)
    return response;
  }

  getTemplete(): Observable<any> {
    let response = this._HttpClient.get(this.baseURL + 'templates');
    // console.log(user)
    return response;
  }
}
