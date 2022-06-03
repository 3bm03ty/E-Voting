import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../Services/notification.service';
import { VotingService } from '../Services/voting.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private notifyService: NotificationService, private _VotingService:VotingService) { }

  home(){
    console.log("000");
    this._VotingService.route = "searchForVote"
  }
  ngOnInit(): void {
  }
  showToasterSuccess() {
    this.notifyService.showSuccess('Hadith added successfully !!', 'Success');
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

}
