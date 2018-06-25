import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppMaterialModule } from './../utils/app-material.module';
import { UtilModule } from './../utils/util.module';

import { CcCompanyService } from './cc-company.service';
import { CcCompanyListComponent } from './cc-company-list.component';
import { CcCompanyComponent } from './cc-company.component';
//import { CcCardComponent } from './cc-card.component';
import { CcCompanycardsComponent } from './cc-companycards.component';
import { CcCompanyDlgComponent } from './cc-company-dlg.component';
import { CcActionsComponent } from './cc-actions.component';

import { PhonefmtPipe } from "../utils/phonefmt.pipe";

const componentList = [
  CcCompanyListComponent
  , CcCompanyComponent
  , CcCompanyDlgComponent
  , CcCompanycardsComponent
  , CcActionsComponent
  //, CcCardComponent
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AppMaterialModule,
    UtilModule
    //CcRoutingModule
  ],
  entryComponents: [CcCompanyDlgComponent],
  declarations: componentList,
  providers: [CcCompanyService, PhonefmtPipe ]
})
export class CcModule {
  constructor() {
    console.log('CcModule');
  }
}
