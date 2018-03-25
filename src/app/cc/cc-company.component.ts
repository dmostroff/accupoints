import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { CcCompany } from './cc-company';

import { CcCompanyDlgComponent} from './cc-company-dlg.component';

@Component({
  selector: 'cc-company',
  templateUrl: './cc-company.component.html',
  styleUrls: ['./cc-company.component.css']
})
export class CcCompanyComponent {
  @Input('ccCompany') ccCompany:CcCompany;

  greed: number;

  constructor(public matDialog:MatDialog) {
    this.ccCompany = new CcCompany();
    this.greed = 123.34;
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
