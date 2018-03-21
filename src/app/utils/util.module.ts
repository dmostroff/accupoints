import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZipcodePipe } from './zipcode.pipe';
import { PhonefmtPipe } from './phonefmt.pipe';
import { SsnfmtPipe } from './ssnfmt.pipe';
import { AccnumberPipe } from './accnumber.pipe';
import { AccNumberMaskPipe } from './acc-number-mask.pipe';


var MY_PIPES = [
  PhonefmtPipe,
  ZipcodePipe,
  SsnfmtPipe,
  AccnumberPipe,
  AccNumberMaskPipe
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MY_PIPES
  ],
  exports: [ MY_PIPES ],
  providers: [ MY_PIPES ]
})
export class UtilModule { }
