import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ssnfmt'
})
export class SsnfmtPipe implements PipeTransform {

  transform(value: string): string {
      if (!value) {
        return value;
      }
      let v = value.replace(/[^\d]/g, '');
      let ssn_fmt = ''; // value.replace( /^(\d{3})(\d{3})(\d+)$/, '$1-$2-$3');
      let kk = 0;
      for (let ii = 0; ii < value.length && ii < 11; ii++) {
        if (value.substring(ii, ii + 1).match(/\d/)) {
          ssn_fmt += value.substring(ii, ii + 1);
          if (kk == 2 || kk == 4) {
            ssn_fmt += '-';
          }
          kk++;
        }
      }
      ssn_fmt = ssn_fmt.replace(/\-$/, '');
      return ssn_fmt;
  }

}
