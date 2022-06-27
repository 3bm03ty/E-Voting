import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss'],
})
export class AdminNavbarComponent implements OnInit {
  admin: any;
  constructor(private _AuthService: AuthService, private _Router: Router) {
    if (_AuthService.adminToken == '') {
      // this._Router.navigate(['adminlogin']);
    } else {
      this.admin = _AuthService.admin;
    }
  }

  ngOnInit(): void {}

  logOut() {
    this._AuthService
      .adminSignOut(this._AuthService.adminToken)
      .subscribe((response) => {
        this._AuthService.adminToken = '';
        // this._Router.navigate(['adminlogin']);
      });
  }
}
