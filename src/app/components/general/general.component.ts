import Swal  from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ElectionService } from 'src/app/Services/election.service';
import { VotingService } from 'src/app/Services/voting.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  start :any;
  end :any;
  name :any;
  election:any;
  constructor(private _VotingService:VotingService,
    private _ElectionService: ElectionService) { }


    electionData = new FormGroup({
      name: new FormControl(null, [Validators.required])
    });
  
    editElectionDate(editedElection: FormGroup) {
      // console.log({
      //   ...editedElection.value,
      //   id: this.election._id,
      //   name: this.election.name,
      // });
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
              start: this.election.start,
              end: this.election.end,
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
      }
    });
  }

}
