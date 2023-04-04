import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTimeRemoval',
})
export class DateTimeRemovalPipe implements PipeTransform {
  transform(value: string): string {
    return value.substring(0, value.indexOf('T'));
  }
}
