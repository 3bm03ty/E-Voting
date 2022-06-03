import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-for-delete',
  templateUrl: './search-for-delete.component.html',
  styleUrls: ['./search-for-delete.component.scss']
})
export class SearchForDeleteComponent implements OnInit,OnDestroy {

  constructor() { }
  ngOnDestroy(): void {
    console.log("000");
  }
  
  searchForm = new FormGroup({
    TxtID: new FormControl(null, [Validators.required]),
  });

  searchSubmit(searchInfo: any) {
    console.log(searchInfo.value.TxtID);

    // this._VotersService.getVoter(searchInfo.value.TxtID).subscribe((Response) => {
    //   // console.log(Response.user);
    //   if (Response.user != null) {
    //     this._VotersService.voter = Response.user;
    //     this._AuthService
    //       .setTemplete({'template':Response.user.template})
    //       .subscribe((response) => {
    //         console.log(response);
    //         this._Router.navigate(['/foundprofile']);
    //       });
        
    //   }
    // });
  }

  search(){
    console.log(document.getElementById("txtID"));
    
  }
  ngOnInit(): void {


  }

}
