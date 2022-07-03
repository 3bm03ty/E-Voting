import { VotingService } from 'src/app/Services/voting.service';
import { CandidatesService } from 'src/app/Services/candidates.service';
import { VotesService } from './../../Services/votes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  numOfVotes: any;
  numOfCandidates: any;
  start: any;
  end: any;
  name: any;
  constructor(
    private _VotesService: VotesService,
    private _CandidatesService: CandidatesService,
    private _VotingService: VotingService
  ) {}

  ngOnInit(): void {
    this._VotesService.getAllVotes().subscribe((response) => {
      this.numOfVotes = response.votes.length;
    });

    this._CandidatesService.getAllCandidates().subscribe((response) => {
      this.numOfCandidates = response.candidate.length;
      console.log(this.numOfCandidates);
    });

    this._VotingService.getElection().subscribe((response) => {
      console.log(response.election.length);
      if (response.election.length != 0) {
        this.start = response.election[0].start.split('T')[0];
        this.end = response.election[0].end.split('T')[0];
        this.name = response.election[0].name;
      }
    });
  }
}
