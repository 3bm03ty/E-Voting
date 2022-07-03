import Swal from 'sweetalert2';
import { CandidatesService } from 'src/app/Services/candidates.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VotingService } from 'src/app/Services/voting.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ElectionService } from 'src/app/Services/election.service';

@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.scss'],
})
export class DatesComponent implements OnInit, OnDestroy {
  start: any;
  end: any;
  name: any;
  election: any;
  constructor(
    private _VotingService: VotingService,
    private _ElectionService: ElectionService
  ) {}
  ngOnDestroy(): void {}

  electionData = new FormGroup({
    start: new FormControl(null, [Validators.required]),
    end: new FormControl(null, [Validators.required]),
  });

  editElectionDate(editedElection: FormGroup) {
    console.log({
      ...editedElection.value,
      id: this.election._id,
      name: this.election.name,
    });
    Swal.fire({
      title: 'Are you sure?',
      // text: "You want to",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this._ElectionService
          .updateElection({
            ...editedElection.value,
            id: this.election._id,
            name: this.election.name,
          })
          .subscribe((response) => {
            console.log(response);
            Swal.fire('Updated!', 'Your election has been updated.', 'success');
          });
      }
    });
  }

  ngOnInit(): void {
    this._VotingService.getElection().subscribe((response) => {
      console.log(response.election.length);
      if (response.election.length != 0) {
        this.election = response.election[0];
        this.start = response.election[0].start.split('T')[0];
        this.end = response.election[0].end.split('T')[0];
        this.name = response.election[0].name;
        this.electionData.patchValue({
          start: this.start,
          end: this.end,
          name: this.name,
          id: response.election[0]._id,
        });
      }
    });
  }
}
