import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string[]): string {
    if (!value || value.length < 6) {
      return '';
    }

    const pad = (n: string) => n.length === 1 ? '0' + n : n;

    const year = value[0];
    const month = pad(value[1]);
    const day = pad(value[2]);
    const hours = pad(value[3]);
    const minutes = pad(value[4]);
    const seconds = pad(value[5]);

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }
}
