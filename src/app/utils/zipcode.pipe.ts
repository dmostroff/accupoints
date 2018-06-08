import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zipcode'
})
export class ZipcodePipe implements PipeTransform {

  transform(value:any):any {
    if (!value) {
      return value;
    }
    let v = value.replace(/[^\d]/g, '');
    let kk = 0;
    let zip_fmt = ''; // value.replace( /^(\d{3})(\d{3})(\d+)$/, '$1-$2-$3');
    for (let ii = 0; ii < value.length && ii < 9; ii++) {
      if (value.substring(ii, ii + 1).match(/\d/)) {
        zip_fmt += value.substring(ii, ii + 1);
        if (kk == 2 || kk == 5) {
          zip_fmt += '-';
        }
        kk++;
      }
    }
    zip_fmt = zip_fmt.replace(/\-$/, '');
    return zip_fmt;
  }

}
