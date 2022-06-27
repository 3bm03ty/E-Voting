import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { VotingService } from '../../Services/voting.service';

@Component({
  selector: 'app-admin-control',
  templateUrl: './admin-control.component.html',
  styleUrls: ['./admin-control.component.scss']
})
export class AdminControlComponent implements OnInit, OnDestroy {

  constructor(private _VotingService:VotingService,private _AuthService:AuthService, private _Router:Router) {
    if(_AuthService.admin == undefined){
      // _Router.navigate(['adminlogin']);
    }
   }
  ngOnDestroy(): void {
    this._AuthService.admin = undefined
  }

  route(){
    this._VotingService.route = "adminControl"
  }
  ngOnInit(): void {
  }

  

}
