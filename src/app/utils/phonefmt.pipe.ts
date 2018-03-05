import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phonefmt'
})
export class PhonefmtPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
