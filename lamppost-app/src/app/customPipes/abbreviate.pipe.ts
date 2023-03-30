import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abbreviate',
})
export class AbbreviatePipe implements PipeTransform {
  transform(value: string, args?: any): string {
    const names = value.split(' ');
    let abbreviation = '';

    names.forEach((name) => {
      abbreviation += name.charAt(0).toUpperCase();
    });

    return abbreviation;
  }
}
