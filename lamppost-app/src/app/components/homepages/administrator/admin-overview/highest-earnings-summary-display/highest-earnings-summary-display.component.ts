import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-highest-earnings-summary-display',
  templateUrl: './highest-earnings-summary-display.component.html',
  styleUrls: ['./highest-earnings-summary-display.component.scss'],
})
export class HighestEarningsSummaryDisplayComponent implements OnInit {
  @Input() currentMonth!: string;
  @Input() highestTotal!: number;
  displayMessage!: string;
  ngOnInit(): void {
    this.displayMessage = `The highest earnings of month ${this.currentMonth} with a summarized total of ${this.highestTotal} €`;
  }
}
