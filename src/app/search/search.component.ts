import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { VotersService } from '../Services/voters.service';
import { Router } from '@angular/router';
import { VotingService } from '../Services/voting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _VotersService: VotersService,
    private _VotingService:VotingService,
  ) {}

  route:any;

  searchForm = new FormGroup({
    TxtID: new FormControl(null, [Validators.required]),
  });

  searchSubmit(searchInfo: any) {
    // console.log(searchInfo.value.TxtID);

    this._VotersService.getVoter(searchInfo.value.TxtID).subscribe((Response) => {
      // console.log(Response.user);
      if (Response.user != null) {
        this._VotersService.voter = Response.user;
        this._AuthService
          .setTemplete({'template':Response.user.template})
          .subscribe((response) => {
            console.log(response);
            this._Router.navigate(['/foundprofile']);
          });
        
      }else{
        Swal.fire("voter can't found")
      }
    });
  }

  ngOnInit(): void {
    this.route = this._VotingService.route;
  }

  getusr() {}
}
