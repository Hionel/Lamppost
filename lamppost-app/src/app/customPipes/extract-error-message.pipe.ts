import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractErrorMessage',
})
export class ExtractErrorMessagePipe implements PipeTransform {
  transform(value: string): string {
    const startIndex = value.indexOf(':') + 2;
    const endIndex = value.indexOf('(') - 1;
    return value.slice(startIndex, endIndex);
  }
}
