import { Component, OnInit } from '@angular/core';
import { CandidatesService } from '../../Services/candidates.service';
import { VotersService } from '../../Services/voters.service';
import { VotingService } from '../../Services/voting.service';
import Swal from 'sweetalert2';
import { Route, Router } from '@angular/router';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss'],
})
export class VotingComponent implements OnInit {
  candidates: any;
  constructor(
    private notifyService: NotificationService,
    private _CandidatesService: CandidatesService,
    private _VotingService: VotingService,
    private _VotersService: VotersService,
    private _Router: Router
  ) {
    if (this._VotersService.voter == null) {
      // this._Router.navigate(['/search']);
    }
  }

  vote(candidate: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: `You will vote to ${candidate.fname} ${candidate.pname}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, Vote to ${
        candidate.nickName || candidate.fname + ' ' + candidate.pname
      }`,
    })
      .then((result) => {
        if (result.isConfirmed) {
          this._VotingService
            .vote(candidate._id, this._VotersService.voter)
            .subscribe((Response) => {
              if (Response.success) {
                Swal.fire(
                  'Voted Successfuly!',
                  `You are voted to ${candidate.nickName}.`,
                  'success'
                )
                  .then(() => {
                    this.notifyService.showSuccess(
                      'You voted successfully !!',
                      'Success'
                    );
                  })
                  .then(() => {
                    this._Router.navigate(['/search']);
                    this._VotersService.voter = null;
                  });
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: Response.msg || Response.message,
                }).then(() => {
                  this._Router.navigate(['/search']);
                  this._VotersService.voter = null;
                });
              }
              // console.log(Response);
            });
        }
      })
      .then(() => {
        console.log('Done');
      });
  }

  ngOnInit(): void {
    this._CandidatesService.getAllCandidates().subscribe((response) => {
      this.candidates = response.candidate;
      console.log(response.candidate);
    });
  }
}
