import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../Services/auth.service';
import { VotersService } from '../Services/voters.service';
import { VotingService } from '../Services/voting.service';
// import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-found-profile',
  templateUrl: './found-profile.component.html',
  styleUrls: ['./found-profile.component.scss'],
  // providers: [DatePipe]
})
export class FoundProfileComponent implements OnInit {
  voter: any;
  age: any;
  myDate = new Date();
  searchCase: any;
  constructor(
    private _VotersService: VotersService,
    private _AuthServices: AuthService,
    private _Router: Router,
    private _VotingService: VotingService // private datePipe: DatePipe
  ) {
    if (!this._VotersService.voter) {
      this._Router.navigate(['/search']);
    }

    this.searchCase = this._VotingService.route;
    console.log(this.searchCase);

    this._AuthServices.getTemplete().subscribe((response) => {
      // console.log(response.template);
    });

    if (this._VotersService.voter.birthday) {
      var dob = new Date(this._VotersService.voter.birthday);
      //calculate month difference from current date in time
      var month_diff = Date.now() - dob.getTime();

      //convert the calculated difference in date format
      var age_dt = new Date(month_diff);

      //extract year from date
      var year = age_dt.getUTCFullYear();

      //now calculate the age of the user
      var age = Math.abs(year - 1970);
      this.age = age;
    }
  }

  deleteVoter() {
    let voter = { NID: this._VotersService.voter.NID };
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this._VotersService.deleteVoter(voter).subscribe((response) => {
            swalWithBootstrapButtons
              .fire('Deleted!', 'Voter has been deleted.', 'success')
              .then(() => {
                this._Router.navigate(['/search']);
              });
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          );
        }
      });

    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: "You won't be able to revert this!",
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Yes, delete voter!',
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     this._VotersService.deleteVoter(voter).subscribe((response) => {
    //       Swal.fire('Deleted!', 'Voter has been deleted.', 'success').then(()=>{
    //         this._Router.navigate(['/search']);
    //       })
    //     });
    //   }
    // });
  }

  LaunchURLScript() {
    window.open('zk:');
  }
  ngOnInit(): void {
    this.voter = this._VotersService.voter;
  }
}
