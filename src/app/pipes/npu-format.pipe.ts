import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'npuFormat'
})
export class NpuFormatPipe implements PipeTransform {

  transform(value: string): string {
    const numericValue = value.replace(/\D/g, '');

    if (numericValue.length !== 20) {
      return value;
    }

    return `${numericValue.substring(0, 7)}-${numericValue.substring(7, 9)}.${numericValue.substring(9, 13)}.${numericValue.substring(13, 14)}.${numericValue.substring(14, 16)}.${numericValue.substring(16)}`;
  }

}
