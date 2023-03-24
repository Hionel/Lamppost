import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { NumberFormatterPipe } from 'src/app/customPipes/number-formatter.pipe';

@Component({
  selector: 'app-highest-earnings-summary-display',
  templateUrl: './highest-earnings-summary-display.component.html',
  styleUrls: ['./highest-earnings-summary-display.component.scss'],
})
export class HighestEarningsSummaryDisplayComponent implements OnInit {
  @Input() currentMonth!: string;
  @Input() highestTotal!: number;
  highestTotalDisplayed!: string;
  displayMessage!: string;
  constructor(private numberFormatterPipe: NumberFormatterPipe) {}
  ngOnInit(): void {
    this.displayMessage = this.numberFormatterPipe.transform(this.highestTotal);
    this.displayMessage = `The highest earnings are in ${this.currentMonth} with a summarized total of ${this.displayMessage} €`;
  }
  ngOnChanges(changes: SimpleChanges) {
    if (
      (changes['currentMonth'] && !changes['currentMonth'].firstChange) ||
      (changes['highestTotal'] && !changes['highestTotal'].firstChange)
    ) {
      this.displayMessage = `The highest earnings are in ${this.currentMonth} with a summarized total of ${this.displayMessage} €`;
    }
  }
}
