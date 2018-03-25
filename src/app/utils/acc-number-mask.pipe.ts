import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accnumbermask'
})
export class AccNumberMaskPipe implements PipeTransform {

  transform(value:string):string {
    if (!value) {
      return value;
    }
    let v = value.replace(/[^\d]/g, '');
    return v.substr(0, 4) + '*'.repeat(8) + v.substr(v.length - 4, 4)
  }
}
