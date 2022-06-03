import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { NotificationService } from '../Services/notification.service';
import { VotersService } from '../Services/voters.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  
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
  
  constructor( private _AuthService:AuthService, private _VotersService:VotersService, private notifyService: NotificationService) {}
  getFingerprint(){
    window.open('zk:');
  }

  getRegisterInfo(registerForm: FormGroup, formDirective: FormGroupDirective) {
    let registerForm1 = {...registerForm,"flag":false,"template":""}
    console.log(registerForm1);
    // if(registerForm.status =="VALID"){
      this._VotersService.addVoter(registerForm1).subscribe((response)=>{
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
  makeSubmenu() {}

  ngOnInit(): void {}
}

// {
//   "NID": "32548743214580", 
//     "fname": "Mohamed0", 
//     "lname": "Abd El Moaty Mohamed Abd El Aty0", 
//     "city": "Belqas", 
//     "state": "Alexandria",
//     "birthday": "12/7/1995",
//     "gender": "Male"
// }