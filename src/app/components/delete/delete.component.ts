import { Route, Router } from '@angular/router';
import { VotingService } from 'src/app/Services/voting.service';
import { ElectionService } from 'src/app/Services/election.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent implements OnInit {
  election: any;
  constructor(
    private _ElectionService: ElectionService,
    private _VotingService: VotingService,
    private _Router: Router
  ) {}

  deleteElection() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your election has been deleted.',
          'success'
        ).then(() => {
          this._ElectionService
            .deleteElection({ id: this.election._id })
            .subscribe((response) => {
              console.log(response);
              // this._Router.navigate(['/admincontrol']);
              document.location.reload();
            });
        });
      }
    });
  }
  ngOnInit(): void {
    this._VotingService.getElection().subscribe((response) => {
      console.log(response.election.length);
      if (response.election.length != 0) {
        this.election = response.election[0];
      }
    });
  }
}
