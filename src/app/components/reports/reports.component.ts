import { VotesService } from './../../Services/votes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  top = '0';
  left = '-1000px';
  none = 'block'
  constructor(private _VotesService:VotesService) {}

  getCity(city: any) {
    console.log(city);
  }


  onMouseMove(event: MouseEvent): void {
    this.none = 'block'
    let x = (event.target as Element).className;
   
      console.log(Object(x).animVal);
    
     // Outputs the element the mouse is currently over
    // console.log(event.clientX, event.clientY);
    this.top = event.clientY-100 + 'px';
    this.left = event.clientX-50 + 'px';
  }

  mapHover(event: MouseEvent): void {
    this.none = 'none'
  }
  mapHover2(event: MouseEvent): void {
    this.none = 'block'
  }
  ngOnInit(): void {
    this._VotesService.getCandidateVoter("62bb773bdadc0e69aa8d74e1").subscribe((response)=>{
      console.log(response);
      
    })
  }
}
function getElementById(arg0: string) {
  throw new Error('Function not implemented.');
}
