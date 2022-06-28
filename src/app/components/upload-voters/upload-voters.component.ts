import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { VotersService } from '../../Services/voters.service';
import { VotingService } from '../../Services/voting.service';

@Component({
  selector: 'app-upload-voters',
  templateUrl: './upload-voters.component.html',
  styleUrls: ['./upload-voters.component.scss'],
})
export class UploadVotersComponent implements OnInit {
  inSearch: any;
  shortLink: string = '';
  loading: boolean = false; // Flag variable
  file: File | undefined;
  percent:number = 85;
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _VotersService: VotersService,
    private _VotingService: VotingService,
  ) {}
  onChange(event: any) {
    this.file = event.target.files[0];
  }

  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    this.percent = 85;
    this._VotersService.uploadVoterExcel(this.file).subscribe((event: any) => {
      if (typeof event === 'object') {
        // Short link via api response
        this.shortLink = event.link;
        this.percent = 100;
        this.loading = false; // Flag variable
      }
      console.log(event);
      
    });
  }

  ngOnInit(): void {
    this.inSearch = false;
  }

  voterExcel = new FormGroup({
    ExcelFile: new FormControl(null, [Validators.required]),
  });
  // fileChange(event: any) {
  //   let fileList: FileList = event.target.files;
  //   if (fileList.length > 0) {
  //     let file: File = fileList[0];
  //     let formData: FormData = new FormData();
  //     formData.append('uploadFile', file, file.name);
  //     let headers = new Headers();
  //     /** In Angular 5, including the header Content-Type can invalidate your request */
  //     headers.append('Content-Type', 'multipart/form-data');
  //     headers.append('Accept', 'application/json');
  //     let options = new RequestOptions({ headers: headers });
  //     this.http
  //       .post(`${this.apiEndPoint}`, formData, options)
  //       .map((res) => res.json())
  //       .catch((error) => Observable.throw(error))
  //       .subscribe(
  //         (data) => console.log('success'),
  //         (error) => console.log(error)
  //       );
  //   }
  // }

  // uploadExcel(excelFile: any) {
  //   // this.inSearch = true;
  //   const formData = new FormData();
  //   formData.append('voter', excelFile.data);
  //   console.log(formData);

  //   // this._VotingService.uploadVoterExcel(excelFile).subscribe((Response) => {

  //   //   if (Response.user != null) {
  //   //     this._VotersService.voter = Response.user;
  //   //     this._AuthService
  //   //       .setTemplete({'template':Response.user.template})
  //   //       .subscribe((response) => {
  //   //         this._Router.navigate(['/foundprofile']);
  //   //       });

  //   //   }else{
  //   //     // Swal.fire("voter can't found")
  //   //     this.inSearch = false;
  //   //   }
  //   //   console.log(Response);

  //   // });
  // }
}
