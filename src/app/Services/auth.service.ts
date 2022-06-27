import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL = 'https://moproject.herokuapp.com/';
  authBaseURL = 'https://route-egypt-api.herokuapp.com/';

  adminToken:any = ""
  admin:any;

  constructor(private _HttpClient: HttpClient) {}

  // register(registerFormValue: object): Observable<any> {
  //   let x = this._HttpClient.post(this.baseURL + 'votars/', registerFormValue);
  //   return x;
  // }

  setTemplete(templete: any): Observable<any> {
    let response = this._HttpClient.post(this.baseURL + 'templates', templete);
    return response;
  }

  getTemplete(): Observable<any> {
    let response = this._HttpClient.get(this.baseURL + 'templates');
    return response;
  }

  adminLogin(email: any, password: any): Observable<any> {
    return this._HttpClient.post(this.authBaseURL + 'signin', {
      "email": email,
      "password": password,
    });
  }

  adminSignOut(token: any): Observable<any> {
    return this._HttpClient.post(this.authBaseURL + 'signOut', {
      "token": token
    });
  }
}
