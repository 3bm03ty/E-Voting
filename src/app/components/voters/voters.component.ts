import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { VotersService } from 'src/app/Services/voters.service';
import { VotingService } from 'src/app/Services/voting.service';
import Swal from 'sweetalert2';
import * as bootstrap from 'bootstrap';
@Component({
  selector: 'app-voters',
  templateUrl: './voters.component.html',
  styleUrls: ['./voters.component.scss'],
})
export class VotersComponent implements OnInit {
  inSearch: any;
  shortLink: string = '';
  loading: boolean = false; // Flag variable
  file: File | undefined;
  template: any = '';
  submited: any;
  inResponse: boolean = false;
  voter: any;
  Cities = [
    'Alexandria',
    'Aswan',
    'Asyut',
    'Beheira',
    'Beni Suef',
    'Cairo',
    'Dakahlia',
    'Damietta',
    'Faiyum',
    'Gharbia',
    'Giza',
    'Ismailia',
    'Kafr El Sheikh',
    'Luxor',
    'Matruh',
    'Minya',
    'Monufia',
    'New Valley',
    'North Sinai',
    'Port Said',
    'Qalyubia',
    'Qena',
    'Red Sea',
    'Sharqia',
    'Sohag',
    'South Sinai',
    'Suez',
  ];
  States = {
    Alexandria: [],
  };
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _VotersService: VotersService,
    private _VotingService: VotingService
  ) {}

  addVoterForm = new FormGroup({
    fname: new FormControl(null, [Validators.required]),
    pname: new FormControl(null, [Validators.required]),
    status: new FormControl(null, [Validators.required]),
    gender: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    NID: new FormControl(null, [Validators.required]),
    state: new FormControl(null, [Validators.required]),
    birthday: new FormControl(null, [Validators.required]),
    template: new FormControl(null, []),
  });

  editVoterForm = new FormGroup({
    fname: new FormControl(null, [Validators.required]),
    pname: new FormControl(null, [Validators.required]),
    status: new FormControl(null, [Validators.required]),
    gender: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    NID: new FormControl(null, [Validators.required]),
    state: new FormControl(null, [Validators.required]),
    birthday: new FormControl(null, [Validators.required]),
    template: new FormControl(null, []),
  });

  ngOnInit(): void {}

  voterExcel = new FormGroup({
    ExcelFile: new FormControl(null, [Validators.required]),
  });

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  onCityChange(e: any) {
    console.log(e.target.value);
  }

  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    if (this.file != undefined) {
      let timerInterval: any;
      Swal.fire({
        title: 'Import Voters Excel Sheet',
        html: `Upload will finished in milliseconds.`,
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          // const b = Swal.getHtmlContainer().querySelector('b')!;
          // timerInterval = setInterval(() => {
          //   b.textContent = Swal.getTimerLeft();
          // }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          // console.log('I was closed by the timer');
        }
      });

      this._VotingService
        .uploadVoterExcel(this.file)
        .subscribe((event: any) => {
          if (typeof event === 'object') {
            // Short link via api response
            this.shortLink = event.link;
            this.loading = false; // Flag variable
          }
          if (event.code == 11000) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: event.writeErrors[0].errmsg,
            });
          } else {
            Swal.fire({
              icon: 'success',
              title: 'Data uploaded succesfully',
              text: event,
            });
          }
          console.log(event);
        });
    }
  }

  resetTemplate() {
    this._VotingService.resetTemplate().subscribe((response) => {
      console.log(response);
    });
  }

  getRegisterInfo(addVoterForm: any) {
    console.log(addVoterForm.value);
    this.inResponse = true;
    if (addVoterForm.status == 'VALID') {
      console.log(addVoterForm);
      // $('#exampleModal1').modal('hide');
      this._VotersService.addVoter(addVoterForm.value).subscribe((response) => {
        this.inResponse = false;
        console.log(response);
        if (response.success == true) {
          this.addVoterForm.reset();
          this.template = '';
          $('#exampleModal1').modal('hide');
          Swal.fire({
            icon: 'success',
            title: 'Good job',
            text: 'Voter add successfully',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.msg,
          });
        }
      });
    } else {
      if (this.template == '') {
        this.submited = true;
      } else {
        this.submited = false;
      }
    }
  }

  searchVoter() {
    Swal.fire({
      title: 'Enter Voter ID',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Search',
      showLoaderOnConfirm: true,
      preConfirm: (NID) => {
        if (NID != '') {
          // 
          Swal.fire("Loading ....")
          Swal.showLoading();
          this.inResponse = true;
          // Swal.fire({
          //   title: 'Auto close alert!',
          //   html: 'I will close in <b></b> milliseconds.',
          //   timer: 10000,
          //   timerProgressBar: true,
          // });
          this._VotersService.getVoter(NID).subscribe((voter) => {
            if (voter.user != null) {
              console.log(voter.user);
              this.voter = voter.user;
              this.inResponse = false;
              $('#exampleModal2').modal('show');
              Swal.close();
            }else{
              // $('#exampleModal2').modal('hide');
              Swal.fire("No voter found with this National ID")
              // 
            }
          });
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  }

  deleteVoter(NID: any) {
    $('#exampleModal2').modal('hide');
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
          Swal.showLoading();
          this._VotersService.deleteVoter(NID).subscribe((response) => {
            console.log(response);
            Swal.close();
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Voter has been deleted.',
              'success'
            );
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Voter is in safe :)',
            'error'
          );
        }
      });
  }

  editSearch(){
    Swal.fire({
      title: 'Enter Voter ID',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Search',
      showLoaderOnConfirm: true,
      preConfirm: (NID) => {
        if (NID != '') {
          // 
          Swal.fire("Loading ....")
          Swal.showLoading();
          this.inResponse = true;
          // Swal.fire({
          //   title: 'Auto close alert!',
          //   html: 'I will close in <b></b> milliseconds.',
          //   timer: 10000,
          //   timerProgressBar: true,
          // });
          this._VotersService.getVoter(NID).subscribe((voter) => {
            if (voter.user != null) {
              console.log(voter.user);
              this.voter = voter.user;
              this.inResponse = false;
              $('#exampleModal3').modal('show');
              Swal.close();
              this.setEditInfo(this.editVoterForm);
            }else{
              // $('#exampleModal2').modal('hide');1234567895124
              Swal.fire("No voter found with this National ID")
              // 
            }
          });
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  }

  setEditInfo(editVoterForm:any){
    editVoterForm.setValue({
      fname: this.voter.fname,
      pname: this.voter.pname,
      NID: this.voter.NID,
      birthday: this.voter.birthday,
      city: this.voter.city,
      gender: this.voter.gender,
      state: this.voter.state,
      status: this.voter.status,
      template: this.voter.template
    });
    this.template = this.voter.template;
    // this.editVoterForm.
  }

  updateVoter(editVoterForm:any){
    console.log({'_id':this.voter._id,...editVoterForm.value});
    $('#exampleModal3').modal('hide');
    Swal.fire("Loading ....")
    Swal.showLoading();
    this._VotersService.updateVoter({'_id':this.voter._id,...editVoterForm.value}).subscribe((response)=>{
      console.log(response);
      Swal.hideLoading();
      if(response.success){
        Swal.fire(
          'Updated!',
          'Voter has been updated.',
          'success'
        )
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        })
        
      }
    })
  }

  cancel(){
    Swal.fire(
      'Cancelled',
      ' :)',
      'error'
    )
  }

  getTemplate() {
    this._VotingService.getTemplate().subscribe((response) => {
      // console.log(response);
      this.template = response.template;
      if (response.template != '') {
        this.addVoterForm.patchValue({
          template: response.template,
        });
      }
    });
  }

  LaunchURLScript() {
    window.open('addvoter:');
    setTimeout(() => {
      this.getTemplate();
    }, 5000);

    setTimeout(() => {
      if (this.template == '') {
        this.getTemplate();
      }
    }, 10000);
    setTimeout(() => {
      if (this.template == '') {
        this.getTemplate();
      }
    }, 15000);
    setTimeout(() => {
      if (this.template == '') {
        this.getTemplate();
      }
    }, 20000);
    setTimeout(() => {
      if (this.template == '') {
        this.getTemplate();
      }
    }, 25000);
    setTimeout(() => {
      if (this.template == '') {
        this.getTemplate();
      }
    }, 30000);
  }
}
