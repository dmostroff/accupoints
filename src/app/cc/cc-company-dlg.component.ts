import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { CcCompany } from './cc-company';
import { CcCompanyService } from './cc-company.service';

import { PhonefmtPipe } from './../utils/phonefmt.pipe';

@Component({
  selector: 'app-cc-company-dlg',
  templateUrl: './cc-company-dlg.component.html',
  styleUrls: ['./cc-company-dlg.component.css']
})
export class CcCompanyDlgComponent  {
  ccCompanyForm:FormGroup;
  ccCompanyFormControl:FormControl;
  ccCompany: CcCompany;
  originalCompanyName: String;

  constructor(private ccCompanyService: CcCompanyService
    , private fb:FormBuilder
    , public dialogRef:MatDialogRef<CcCompanyDlgComponent>
    , @Inject(MAT_DIALOG_DATA) public data:CcCompany
    , private phonefmt: PhonefmtPipe
  ) {
    this.ccCompany = new CcCompany();
    this.ccCompany.set(data);
    this.ccCompanyFormControl = new FormControl([Validators.required]);
    this.createForm();
  }

  createForm() {
    console.log(["getValues", this.ccCompany]);
    let vals = {
      cc_company_id: this.ccCompany.cc_company_id
      , cc_name: this.ccCompany.cc_name
      , url: this.ccCompany.url
      , contact: this.ccCompany.contact
      , address_1: this.ccCompany.address_1
      , address_2: this.ccCompany.address_2
      , city: this.ccCompany.city
      , state: this.ccCompany.state
      , zip: this.ccCompany.zip
      , country: this.ccCompany.country
      , phone: this.ccCompany.phone
      , phone_2: this.ccCompany.phone_2
      , phone_cell: this.ccCompany.phone_cell
      , phone_fax: this.ccCompany.phone_fax
    };
    this.ccCompanyForm = this.fb.group(vals);
  }

  ngOnInit() {
    let flds = [ 'phone', 'phone_2', 'phone_cell', 'phone_fax'];
    flds.forEach( fld => {
      this.ccCompanyForm.controls[fld].setValue(this.phonefmt.transform(this.ccCompanyForm.value[fld]), {emitEvent: false});
      this.ccCompanyForm.controls[fld].valueChanges.subscribe(
        (value:string) => {
          this.ccCompanyForm.controls[fld].setValue(this.phonefmt.transform(value), {emitEvent: false});
        }
      );

    })

  }
  onSubmit() {
    this.ccCompanyService.postCompany(this.ccCompanyForm.value);
    //console.log(this.view.oldValue);
    console.log([this.originalCompanyName, this.ccCompanyForm.value.cc_name]);
    if( this.originalCompanyName !== this.ccCompanyForm.value.cc_name) {
      this.ccCompanyService.getCompanyList();
    }
    this.dialogRef.close();
  }

  onClickCancel() {
    this.dialogRef.close();
  }

}
