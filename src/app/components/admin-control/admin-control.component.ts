import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VotesService } from './../../Services/votes.service';
import { CandidatesService } from './../../Services/candidates.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { VotingService } from '../../Services/voting.service';
import { Dayjs } from 'dayjs';
import { ElectionService } from 'src/app/Services/election.service';

@Component({
  selector: 'app-admin-control',
  templateUrl: './admin-control.component.html',
  styleUrls: ['./admin-control.component.scss'],
})
export class AdminControlComponent implements OnInit, OnDestroy {
  numOfCandidiates: any;
  isInElection: any;
  selected: { startDate: Dayjs; endDate: Dayjs } | undefined;
  start: any;
  end: any;
  name: any;
  // election ={
  //   name :'',
  //   start:'',
  //   end:''
  // }

  constructor(
    private _VotingService: VotingService,
    private _AuthService: AuthService,
    private _CandidatesService: CandidatesService,
    private _VotesService: VotesService,
    private _ElectionService: ElectionService,
    private _Router: Router
  ) {
    if (_AuthService.admin == undefined) {
      _Router.navigate(['adminlogin']);
    }
  }

  electionData = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    start: new FormControl(null, [Validators.required]),
    end: new FormControl(null, [Validators.required]),
  });
  ngOnDestroy(): void {
    this._AuthService.admin = undefined;
  }

  createElection(electionData: FormGroup) {
    // console.log(electionData.value.date);
    // console.log(electionData.value.date.startDate.$D + '/' + (++electionData.value.date.startDate.$M)+ '/' + electionData.value.date.startDate.$y);
    // console.log(electionData.value.date.startDate.$M+1);
    // console.log(electionData.value.date.startDate.$y);
    // this.election.start = electionData.value.date.startDate.$D + '/' + (++electionData.value.date.startDate.$M)+ '/' + electionData.value.date.startDate.$y;
    // this.election.end = electionData.value.date.endDate.$D + '/' + (++electionData.value.date.endDate.$M)+ '/' + electionData.value.date.endDate.$y;
    // this.election.name = electionData.value.title;
    console.log(electionData.status);
    console.log(electionData.value);

    if (electionData.status != 'INVALID') {
      // addCandidate
      this._ElectionService
        .addElection(electionData.value)
        .subscribe((response) => {
          console.log(response);
          $('#staticBackdrop').modal('hide');
          this.electionData.reset();
          this.isInElection = true;
          this._ElectionService.start = electionData.value.start;
          this._ElectionService.end = electionData.value.end;
          this._ElectionService.name = electionData.value.name;
          console.log(this.name, this.start, this.end);
        });
    }
  }

  route() {
    this._VotingService.route = 'adminControl';
  }
  logout() {
    this._Router.navigate(['/adminlogin/overview']);
    this._AuthService.admin = undefined;
  }
  ngOnInit(): void {
    this._CandidatesService.getAllCandidates().subscribe((response) => {
      this._CandidatesService.numOfCandidates = response.candidate.length;
      // console.log(this.numOfCandidiates)
    });

    this._VotesService.getAllVotes().subscribe((response) => {
      console.log(response.votes);
    });

    this._VotingService.getElection().subscribe((response) => {
      console.log(response.election.length);
      if (response.election.length != 0) {
        this.isInElection = true;
        this._ElectionService.start = response.election[0].start;
        this._ElectionService.end = response.election[0].end;
        this._ElectionService.name = response.election[0].name;
        
      } else {
        this.isInElection = false;
        this._Router.navigate(['/admincontrol']);
      }
    });

    $('.calendar-table').attr('style', 'padding-right:0 !important');
  }
}
