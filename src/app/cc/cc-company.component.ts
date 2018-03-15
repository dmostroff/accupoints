import { Component, OnInit, Input, Pipe } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { CcCompany } from './cc-company';

import { CcCompanyDlgComponent} from './cc-company-dlg.component';
import {PhonefmtPipe} from "../utils/phonefmt.pipe";

@Component({
  selector: 'cc-company',
  templateUrl: './cc-company.component.html',
  styleUrls: ['./cc-company.component.css']
})
export class CcCompanyComponent {
  @Input('ccCompany') ccCompany:CcCompany;

  constructor(public matDialog:MatDialog
    , private phoneFmt: PhonefmtPipe) {
    this.ccCompany = new CcCompany();
  }

  ngOnChange() {
    this.ccCompany.phone = this.phoneFmt.transform(this.ccCompany.phone ); // this.accountNumberFormat(value);
    console.log(this.ccCompany.phone);
  }

  editForm() {
    console.log('ccCompany - editForm');
    let dialogRef = this.matDialog.open(CcCompanyDlgComponent, {
      data: this.ccCompany,
      width: "750px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(['The company dialog was closed', result]);
      // this.ccCard.set(result);
    });

  }

}
