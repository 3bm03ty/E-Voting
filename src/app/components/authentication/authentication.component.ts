import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { VotersService } from '../../Services/voters.service';
import { VotingService } from '../../Services/voting.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  matched = '';
  stillInTime = true;
  isMatch = false;
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _VotersService: VotersService,
    private _VotingService: VotingService
  ) {
    if (this._VotersService.voter == undefined) {
      this._Router.navigate(['/home']);
    }
  }

  voteNow() {
    if (this.matched == 'Matched') {
      this._Router.navigate(['/voting']);
      this.isMatch = true;
    }
  }

  getMatching() {
    this._VotingService.getMatching().subscribe((response) => {
      this.matched = response.Matching;
      if (!this.isMatch) {
        this.voteNow();
      }
    });

    setTimeout(() => {
      this._VotingService.getMatching().subscribe((response) => {
        this.matched = response.Matching;
        if (!this.isMatch) {
          this.voteNow();
        }
      });
    }, 5000);

    setTimeout(() => {
      this._VotingService.getMatching().subscribe((response) => {
        this.matched = response.Matching;
        if (!this.isMatch) {
          this.voteNow();
        }
      });
    }, 10000);

    setTimeout(() => {
      this._VotingService.getMatching().subscribe((response) => {
        this.matched = response.Matching;
        if (!this.isMatch) {
          this.voteNow();
        }
      });
    }, 15000);

    setTimeout(() => {
      this._VotingService.getMatching().subscribe((response) => {
        this.matched = response.Matching;
        if (!this.isMatch) {
          this.voteNow();
        }
      });
    }, 20000);

    setTimeout(() => {
      this._VotingService.getMatching().subscribe((response) => {
        this.matched = response.Matching;
        if (!this.isMatch) {
          this.voteNow();
        }
      });
    }, 25000);

    setTimeout(() => {
      this._VotingService.getMatching().subscribe((response) => {
        this.matched = response.Matching;
        if (this.matched == '') {
          this.stillInTime = false;
        } else this.voteNow();
      });
    }, 30000);
  }

  ngOnInit(): void {
    this.getMatching();
  }
  LaunchURLScript() {
    window.open('zk:');
    this.stillInTime = true;
  }
}
