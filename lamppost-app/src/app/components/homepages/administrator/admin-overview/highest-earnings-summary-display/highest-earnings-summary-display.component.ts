import { Component } from '@angular/core';

@Component({
  selector: 'app-highest-earnings-summary-display',
  templateUrl: './highest-earnings-summary-display.component.html',
  styleUrls: ['./highest-earnings-summary-display.component.scss'],
})
export class HighestEarningsSummaryDisplayComponent {
  currentMonth: string = 'MAY';
  highestEarner: string = 'Paul';
  highestTotal: number = 5000;

  displayMessage: string = `The highest earnings of month ${this.currentMonth} is ${this.highestEarner} with a total of ${this.highestTotal} €`;
}
