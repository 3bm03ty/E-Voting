import { Component, OnInit } from '@angular/core';
import { CandidatesService } from '../Services/candidates.service';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss'],
})
export class VotingComponent implements OnInit {
  candidates: any;
  constructor(private _CandidatesService: CandidatesService) {}

  vote(){
    
  }
  ngOnInit(): void {
    this._CandidatesService.getAllCandidates().subscribe((response) => {
      this.candidates = response.candidate;
      console.log(response.candidate);
    });
  }
}
