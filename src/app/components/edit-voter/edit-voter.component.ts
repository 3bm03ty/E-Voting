import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { NotificationService } from '../../Services/notification.service';
import { VotersService } from '../../Services/voters.service';

@Component({
  selector: 'app-edit-voter',
  templateUrl: './edit-voter.component.html',
  styleUrls: ['./edit-voter.component.scss']
})
export class EditVoterComponent implements OnInit {

  constructor( private _VotersService:VotersService,private _AuthService:AuthService, private notifyService: NotificationService) { }
  getFingerprint(){
    window.open('zk:');
  }
  registerForm: FormGroup = new FormGroup({
    NID: new FormControl(null, [Validators.required, Validators.minLength(14), Validators.maxLength(14)]),
    fname: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    lname: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    state: new FormControl(null, [Validators.required]),
    status: new FormControl(null, [Validators.required]),
    gender: new FormControl(null, [Validators.required]),
    birthday: new FormControl(null, [Validators.required]),
    template: new FormControl(),
  });

  getRegisterInfo(registerForm: FormGroup, formDirective: FormGroupDirective) {
    let registerForm1 = {...registerForm,"flag":false,"template":""}
    console.log(registerForm1);
    // if(registerForm.status =="VALID"){
      this._VotersService.updateVoter(registerForm1).subscribe((response)=>{
        console.log(response);
        if(response.success){
          this.showToasterSuccess();
          // registerForm.reset();
          formDirective.resetForm();
          this.registerForm.reset();
        }else{
          this.showToasterError(response.message)
        }
        
      })
    // }
  }

  showToasterSuccess() {
    this.notifyService.showSuccess('Voter added successfully !!', 'Success');
  }

  showToasterError(error: any) {
    this.notifyService.showError('Something is wrong', error);
  }

  showToasterInfo() {
    this.notifyService.showInfo('This is info', 'codingshiksha.com');
  }

  showToasterWarning() {
    this.notifyService.showWarning('Hadith is aleardy in favorites', '');
  }
  ngOnInit(): void {

    if(this._VotersService.voter != null){

    }
  }

}
