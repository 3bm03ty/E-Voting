import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { CandidatesService } from 'src/app/Services/candidates.service';
import { VotersService } from 'src/app/Services/voters.service';
import { VotingService } from 'src/app/Services/voting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss'],
})
export class CandidatesComponent implements OnInit {
  inSearch: any;
  shortLink: string = '';
  loading: boolean = false; // Flag variable
  file: File | undefined;
  CLogo: any = '';
  CPic: any = '';
  template: any = '';
  submited: any;
  inResponse: boolean = false;
  candidate: any;
  image1Src: any;
  image2Src: any;
  numOfCandidates: any;
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _VotersService: VotersService,
    private _VotingService: VotingService,
    private _CandidatesService: CandidatesService
  ) {}

  addCandidateForm = new FormGroup({
    fname: new FormControl(null, [Validators.required]),
    pname: new FormControl(null, [Validators.required]),
    cpic: new FormControl(null, [Validators.required]),
    nickName: new FormControl(null, [Validators.required]),
    clogo: new FormControl(null, [Validators.required]),
    NID: new FormControl(null, [Validators.required]),
  });

  editCandidateForm = new FormGroup({
    fname: new FormControl(null, [Validators.required]),
    pname: new FormControl(null, [Validators.required]),
    cpic: new FormControl(null, [Validators.required]),
    nickName: new FormControl(null, [Validators.required]),
    clogo: new FormControl(null, [Validators.required]),
    NID: new FormControl(null, [Validators.required]),
  });

  candidateExcel = new FormGroup({
    ExcelFile: new FormControl(null, [Validators.required]),
  });

  candidateCPic = new FormGroup({
    file: new FormControl(null, [Validators.required]),
  });

  candidateCLogo = new FormGroup({
    file: new FormControl(null, [Validators.required]),
  });

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    if (this.file != undefined) {
      let timerInterval: any;
      Swal.fire({
        title: 'Import Candidates Excel Sheet',
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

      this._CandidatesService
        .uploadCandidateExcel(this.file)
        .subscribe((event: any) => {
          console.log(event);

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

  getRegisterInfo(addCandidateForm: any) {
    // console.log(addCandidateForm.value);
    console.log(this.candidateCPic.value.file);
    // console.log(this.candidateCLogo.value);
    this.inResponse = true;
    this._CandidatesService
      .uploadCPic(this.candidateCPic.value.file)
      .subscribe((response) => {
        console.log(response);
        addCandidateForm.patchValue({
          cpic: response.name,
        });
        this._CandidatesService
          .uploadCLogo(this.candidateCLogo.value.file)
          .subscribe((response) => {
            console.log(response);
            this.addCandidateForm.patchValue({
              clogo: response.name,
            });
            console.log(this.addCandidateForm.value);
            if (addCandidateForm.status == 'VALID') {
              console.log(addCandidateForm);
              // $('#exampleModal1').modal('hide');
              this._CandidatesService
                .addCandidate(addCandidateForm.value)
                .subscribe((response) => {
                  this.inResponse = false;
                  console.log(response);
                  if (response.success == true) {
                    this.addCandidateForm.reset();
                    this.template = '';
                    $('#exampleModal1').modal('hide');
                    Swal.fire({
                      icon: 'success',
                      title: 'Good job',
                      text: 'Candidate added successfully',
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
          });
      });
  }

  searchCandidate() {
    Swal.fire({
      title: 'Enter candidate ID',
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
          Swal.fire('Loading ....');
          Swal.showLoading();
          this.inResponse = true;
          // Swal.fire({
          //   title: 'Auto close alert!',
          //   html: 'I will close in <b></b> milliseconds.',
          //   timer: 10000,
          //   timerProgressBar: true,
          // });
          this._CandidatesService.getCandidate(NID).subscribe((candidate) => {
            if (candidate.candidate != null) {
              console.log(candidate.candidate);
              this.candidate = candidate.candidate;
              this.inResponse = false;
              $('#exampleModal2').modal('show');
              Swal.close();
            } else {
              // $('#exampleModal2').modal('hide');
              Swal.fire('No candidate found with this National ID');
              //
            }
          });
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  }

  deleteCandidate(NID: any) {
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
          this._CandidatesService.deleteCandidate(NID).subscribe((response) => {
            console.log(response);
            Swal.close();
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Candidate has been deleted.',
              'success'
            );
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Candidate is in safe :)',
            'error'
          );
        }
      });
  }

  editSearch() {
    Swal.fire({
      title: 'Enter candidate ID',
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
          Swal.fire('Loading ....');
          Swal.showLoading();
          this.inResponse = true;
          // Swal.fire({
          //   title: 'Auto close alert!',
          //   html: 'I will close in <b></b> milliseconds.',
          //   timer: 10000,
          //   timerProgressBar: true,
          // });
          this._CandidatesService.getCandidate(NID).subscribe((candidate) => {
            if (candidate.candidate != null) {
              console.log(candidate.candidate);
              this.candidate = candidate.candidate;
              this.inResponse = false;
              $('#exampleModal3').modal('show');
              Swal.close();
              this.setEditInfo(this.editCandidateForm);
            } else {
              // $('#exampleModal2').modal('hide');1234567895124
              Swal.fire('No candidate found with this National ID');
              //
            }
          });
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  }

  setEditInfo(editCandidateForm: any) {
    editCandidateForm.setValue({
      fname: this.candidate.fname,
      pname: this.candidate.pname,
      nickName: this.candidate.nickName,
      NID: this.candidate.NID,
      clogo: this.candidate.clogo,
      cpic: this.candidate.cpic,
    });
  }

  updateCandidate(editCandidateForm: any) {
    console.log({ _id: this.candidate._id, ...editCandidateForm.value });
    if (editCandidateForm.status == 'VALID') {
      $('#exampleModal3').modal('hide');
      Swal.fire('Loading ....');
      Swal.showLoading();
      console.log({
        _id: this.candidate._id,
        ...editCandidateForm.value,
      });

      this._CandidatesService
        .updateCandidate({
          _id: this.candidate._id,
          ...editCandidateForm.value,
        })
        .subscribe((response) => {
          console.log(response);
          Swal.hideLoading();
          if (response.success) {
            Swal.fire('Updated!', 'Candidate has been updated.', 'success');
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            });
          }
        });
    }
    console.log(editCandidateForm.status);
  }

  cancel() {
    Swal.fire('Cancelled', ' :)', 'error');
  }

  get f() {
    return this.addCandidateForm.controls;
  }

  onFile1Change(event: any) {
    const reader = new FileReader();
    this.candidateCPic.patchValue({
      file: event.target.files[0],
    });

    this.CPic = event.target.files[0];
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.image1Src = reader.result as string;

        this.addCandidateForm.patchValue({
          fileSource: reader.result,
        });
      };
    }
  }

  onFile2Change(event: any) {
    const reader = new FileReader();
    this.CLogo = event.target.files[0];
    this.candidateCLogo.patchValue({
      file: event.target.files[0],
    });
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.image2Src = reader.result as string;

        this.addCandidateForm.patchValue({
          fileSource: reader.result,
        });
      };
    }
  }

  ngOnInit(): void {
    this._CandidatesService.getAllCandidates().subscribe((response) => {
      this.numOfCandidates = response.candidate.length;
    });
  }
}
