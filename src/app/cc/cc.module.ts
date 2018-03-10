import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CcCompanyService } from './cc-company.service';
import { CcCompanyListComponent } from './cc-company-list.component';
import { CcCompanyComponent } from './cc-company.component';
//import { CcCardComponent } from './cc-card.component';
import { CcCompanycardsComponent } from './cc-companycards.component';
import { CcCompanyDlgComponent } from './cc-company-dlg.component';

import { PhonefmtPipe } from './../utils/phonefmt.pipe';
import { ZipcodePipe } from './../utils/zipcode.pipe'

const componentList = [
  CcCompanyListComponent
  , CcCompanyComponent
  , CcCompanyDlgComponent
  , CcCompanycardsComponent
  //, CcCardComponent
];

@NgModule({
  imports: [
    CommonModule,
    //AppMaterialModule,
    //FlexLayoutModule,
    //FormsModule,
    //ReactiveFormsModule,
    //CcRoutingModule
  ],
  entryComponents: [CcCompanyDlgComponent],
  declarations: componentList,
  providers: [CcCompanyService, PhonefmtPipe, ZipcodePipe ]
})
export class CcModule {
  constructor() {
    console.log('CcModule');
  }
}
