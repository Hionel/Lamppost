import { Component, Input, SimpleChanges } from '@angular/core';
import { NumberFormatterPipe } from 'src/app/customPipes/number-formatter.pipe';

@Component({
  selector: 'app-user-highest-earnings',
  templateUrl: './user-highest-earnings.component.html',
  styleUrls: ['./user-highest-earnings.component.scss'],
})
export class UserHighestEarningsComponent {
  @Input() currentMonth!: string;
  @Input() highestTotal!: number;
  highestTotalDisplayed!: string;
  displayMessage!: string;
  constructor(private numberFormatterPipe: NumberFormatterPipe) {}
  ngOnInit(): void {
    const total = this.numberFormatterPipe.transform(this.highestTotal);
    this.displayMessage = `The highest earnings are in ${this.currentMonth} with a total of ${total} €`;
  }
  ngOnChanges(changes: SimpleChanges) {
    if (
      (changes['currentMonth'] && !changes['currentMonth'].firstChange) ||
      (changes['highestTotal'] && !changes['highestTotal'].firstChange)
    ) {
      this.displayMessage = ``;
      const total = this.numberFormatterPipe.transform(this.highestTotal);

      this.displayMessage = `The highest earnings are in ${this.currentMonth} with a total of ${total} €`;
    }
  }
}
