import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../Services/notification.service';
import { VotingService } from '../../Services/voting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  election: any;
  constructor(
    private notifyService: NotificationService,
    private _VotingService: VotingService,
    private _Router: Router
  ) {}

  ngOnInit(): void {
    this._VotingService.getElection().subscribe((response) => {
      if (response.election.length != 0) {
        this.election = response.election;
      }
    });
  }

  vote() {
    // console.log(this.election);
    // this._Router.navigate(['/search'])
    this._VotingService.getElection().subscribe((response) => {
      this.election = response.election;
      // console.log(response.election.len);
      
      if (response.election.length !=0) {
        this._VotingService.route = 'searchForVote';
        this._Router.navigate(['/search']);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops no election running...',
          text: 'Contact to admin to create an electoin!',
        });
      }
    });
  }

  showToasterSuccess() {
    this.notifyService.showSuccess('Hadith added successfully !!', 'Success');
  }

  showToasterError(error: any) {
    this.notifyService.showError('Something is wrong', error);
  }

  showToasterInfo() {
    this.notifyService.showInfo('This is info', 'codingshiksha.com');
  }

  showToasterWarning() {
    this.notifyService.showWarning('Hadith is aleardy in favorites', '');
  }
}
