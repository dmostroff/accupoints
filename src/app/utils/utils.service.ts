import { Injectable } from '@angular/core';
import { CurrencyPipe} from '@angular/common';

@Injectable()
export class UtilsService {
  currencyPipe:CurrencyPipe;

  constructor() {
    this.currencyPipe = new CurrencyPipe('en-US');
  }

  public currencyInit(val) {
    if (!val) {
      val = 0;
    }
    else {
      val = this.toNumber(val) * 100;
    }
    let v = val.toString(); // .replace( /[^\d|\.]/g,'');
    return this.currencyFmt(v);
  }

  public currencyFmt(val) {
    let v = this.toNumber(val);
    let x = this.currencyPipe.transform(v, 'USD', 'symbol-narrow', '1.2-2'); // this.accountNumberFormat(value);
    return x;
  }

  public toNumber(val) {
    let v = +(+((val).replace(/[^\d|\.]/g, ''))).toFixed(2)
    return v;
  }

  public formatName( first, middle, last) {
    let name = '';
    if( first) { name += first; }
    if( middle) { name += ' ' + middle; }
    if( last) { name = (name.trim()) + ' ' + last; }
    return name.trim();
  }

}
