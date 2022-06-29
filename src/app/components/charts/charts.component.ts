import { CandidatesService } from './../../Services/candidates.service';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  pieChart: any = [];
  barChart: any = [];
  candidatesNames: any = [];
  candidatesVotes: any = [];

  constructor(private _CandidatesService: CandidatesService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    // console.log(this.coinName);
    this._CandidatesService.getAllCandidates().subscribe((response) => {
      console.log(response);
      if (response.success) {
        for (let i = 0; i < response.candidate.length; i++) {
          this.candidatesNames.push(response.candidate[i].nickName);
          this.candidatesVotes.push(response.candidate[i].votes);
        }
        console.log(this.candidatesNames);
        console.log(this.candidatesVotes);
        this.barChart = new Chart('barCanvas', {
          type: 'bar',
          data: {
            labels: this.candidatesNames,
            datasets: [
              {
                label: 'Election Results',
                data: this.candidatesVotes,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.7)',
                  'rgba(255, 159, 64, 0.7)',
                  'rgba(75, 192, 192, 0.7)',
                  'rgba(255, 205, 86, 0.7)',
                  'rgba(54, 162, 235, 0.7)',
                  'rgba(153, 102, 255, 0.7)',
                  'rgba(201, 203, 207, 0.7)',
                ],
                borderColor: [
                  'rgb(255, 99, 132)',
                  'rgb(255, 159, 64)',
                  'rgb(75, 192, 192)',
                  'rgb(255, 205, 86)',
                  'rgb(54, 162, 235)',
                  'rgb(153, 102, 255)',
                  'rgb(201, 203, 207)',
                ],
                borderWidth: 1,
              },
            ],
          },
        });
      }
    });

    this.pieChart = new Chart('pieCanvas', {
      type: 'pie',
      data: {
        labels: this.candidatesNames,
        datasets: [
          {
            label: 'Coin Price',
            data: this.candidatesVotes,
            borderWidth: 3,
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(255, 159, 64, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(255, 205, 86, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(153, 102, 255, 0.7)',
              'rgba(201, 203, 207, 0.7)',
            ],
            hoverOffset: 20,
          },
        ],
      },
    });
  }
}
