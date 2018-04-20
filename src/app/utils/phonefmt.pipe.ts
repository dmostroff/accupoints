import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phonefmt'
})
export class PhonefmtPipe implements PipeTransform {

  transform(value:string):string {
    if (!value) {
      return value;
    }
    let v = value.replace(/[^\d]/g, '');
    let phone_fmt = ''; // value.replace( /^(\d{3})(\d{3})(\d+)$/, '$1-$2-$3');
    let jj = 0;
    let kk = 0;
    let limit = 12;
    if (v.match(/^1/)) {
      phone_fmt = v.substring(0, 1) + '-';
      jj = 1;
      limit = 14;
    }
    for (let ii = jj; ii < value.length && ii < limit; ii++) {
      if (value.substring(ii, ii + 1).match(/\d/)) {
        phone_fmt += value.substring(ii, ii + 1);
        if (kk == 2 || kk == 5) {
          phone_fmt += '-';
        }
        kk++;
      }
    }
    phone_fmt = phone_fmt.replace(/\-$/, '');
    return phone_fmt;
  }
}
