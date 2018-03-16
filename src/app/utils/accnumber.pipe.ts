import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accnumber'
})

export class AccnumberPipe implements PipeTransform {
  transform( value: string): string {
    if(!value) { return value; }
    let v = value.replace(/[^\d]/g, '');
    let jj = 1;
    let newVal = '';
    for (let ii = 0; ii < v.length && newVal.length < 19; ii++) {
      if (v.substr(ii, 1).match(/\d/)) {
        newVal += v.substr(ii, 1);
        if (0 == jj % 4 && jj < 16) {
          newVal += '-';
        }
        jj++;
      }
    }
    newVal = newVal.replace(/\-$/, '');
    return newVal;
  }
}
