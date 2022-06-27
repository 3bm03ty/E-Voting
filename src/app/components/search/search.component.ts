import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { VotersService } from '../../Services/voters.service';
import { Router } from '@angular/router';
import { VotingService } from '../../Services/voting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  inSearch:any;
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _VotersService: VotersService,
    private _VotingService:VotingService,
  ) {
    if(this._VotingService.route == undefined){
      this._Router.navigate(["/home"]);
    }
  }

  route:any;

  searchForm = new FormGroup({
    TxtID: new FormControl(null, [Validators.required]),
  });

  searchSubmit(searchInfo: any) {
    this.inSearch = true;
    this._VotersService.getVoter(searchInfo.value.TxtID).subscribe((Response) => {
      
      if (Response.user != null) {
        this._VotersService.voter = Response.user;
        this._AuthService
          .setTemplete({'template':Response.user.template})
          .subscribe((response) => {
            this._Router.navigate(['/foundprofile']);
          });
        
      }else{
        Swal.fire("No voter found with this National ID")
        this.inSearch = false;
      }
    });
  }

  ngOnInit(): void {
    this.inSearch = false;
    this.route = this._VotingService.route;
  }

  getusr() {}
}
