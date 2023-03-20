import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-most-shifts-card',
  templateUrl: './most-shifts-card.component.html',
  styleUrls: ['./most-shifts-card.component.scss'],
})
export class MostShiftsCardComponent {
  cardTitle: string = 'Employee of the month';
  @Input() mostShiftsNumber: number = 0;
  @Input() employeeName: string = '';
  @Input() monthName: string = '';
}
