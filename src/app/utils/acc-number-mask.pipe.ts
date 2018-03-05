import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accNumberMask'
})
export class AccNumberMaskPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
