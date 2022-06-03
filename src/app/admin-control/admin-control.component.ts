import { Component, OnDestroy, OnInit } from '@angular/core';
import { VotingService } from '../Services/voting.service';

@Component({
  selector: 'app-admin-control',
  templateUrl: './admin-control.component.html',
  styleUrls: ['./admin-control.component.scss']
})
export class AdminControlComponent implements OnInit, OnDestroy {

  constructor(private _VotingService:VotingService,) { }
  ngOnDestroy(): void {
    // route
  }

  route(){
    this._VotingService.route = "adminControl"
  }
  ngOnInit(): void {
  }

}
