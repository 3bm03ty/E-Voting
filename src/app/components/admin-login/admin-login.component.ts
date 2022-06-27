import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import jwt_decode from "jwt-decode";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  isLoging = false;
  constructor(private _AuthService:AuthService, private _Router:Router) { }

  adminLoginForm = new FormGroup({
    AdminID: new FormControl(null, [Validators.required]),
    AdminPassword: new FormControl(null, [Validators.required]),
  });

  adminLogin(adminInfo: any) {
    this.isLoging = true;
    
    this._AuthService.adminLogin(adminInfo.value.AdminID, adminInfo.value.AdminPassword).subscribe((Response) => {
      if(Response.message == "success"){
        this._AuthService.adminToken = Response.token;
        this._AuthService.admin = jwt_decode(Response.token);
        this._Router.navigate(['/admincontrol'])
        this.isLoging = false;
      }else{
        console.log(Response.message);
        Swal.fire(Response.message)
        this.isLoging = false;
      }
    });
  }


  ngOnInit(): void {
  }

}
