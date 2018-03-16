import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule  } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { ClientsService } from './../clients.service';
import { CcCompanyService } from './../../cc/cc-company.service';
import { UtilsService } from './../../utils/utils.service';

import { ClientAccount } from './../client-account';
import { ClientAccountService } from './../client-account.service';
import { ClientPerson } from './../clientperson';
import { CcCards } from './../../cc/cc-cards';

import { PhonefmtPipe } from './../../utils/phonefmt.pipe';
import { AccnumberPipe } from './../../utils/accnumber.pipe';

@Component({
  selector: 'app-client-account-dlg',
  templateUrl: './client-account-dlg.component.html',
  styleUrls: ['./client-account-dlg.component.css']
})

export class ClientAccountDlgComponent {
  title:string;
  clientAccount:ClientAccount;
  accountDate:Date;

  clientAccountForm:FormGroup;
  clientAccountFormControl:FormControl;

  clientPersonList:ClientPerson[];
  ccCards:CcCards[];
  ccCardSelectedValue:number;

  selectedValue:number;

  constructor(private fb:FormBuilder
    , private clientAccountService:ClientAccountService
    , private clientsService:ClientsService
    , private companyService:CcCompanyService
    , private utilsService:UtilsService
    , public dialogRef:MatDialogRef<ClientAccount>
    , private accNumberPipe:AccnumberPipe
    , @Inject(MAT_DIALOG_DATA) public data:ClientAccount) {
    this.clientAccount = data;
    clientsService.clientsListSubject.subscribe(data => {
      this.clientPersonList = data;
      console.log('client List');
      console.log(data);
    });

    companyService.ccCompanyCardsSubject.subscribe(data => {
      this.ccCards = data;
    });
    this.createForm();
  }

  createForm() {
    let account_date = new Date(this.clientAccount.account_date);

    this.clientAccount.account_num = this.accNumberPipe.transform(this.clientAccount.account_num);


    console.log(['createForm', this.clientAccount.account_date]);
    this.clientAccountForm = this.fb.group({
      account_id: this.clientAccount.account_id
      , client_id: this.clientAccount.client_id
      , cc_card_id: this.clientAccount.cc_card_id
      , name: this.clientAccount.name
      , account: this.clientAccount.account
      , account_num: this.clientAccount.account_num
      , account_info: this.clientAccount.account_info
      , account_date: this.clientAccount.account_date
      , cc_login: this.clientAccount.cc_login
      , cc_password: this.clientAccount.cc_password
      , cc_status: this.clientAccount.cc_status
      , annual_fee: this.clientAccount.annual_fee
      , credit_limit: this.clientAccount.credit_limit
      , addtional_card: this.clientAccount.addtional_card
    });

  }

  ngOnInit() {
    this.clientAccountForm.controls['account_num'].setValue(this.accNumberPipe.transform(this.clientAccountForm.value['account_num']), {emitEvent: false});
    this.clientAccountForm.controls['account_num'].valueChanges.subscribe(
      (value:string) => {
        this.clientAccountForm.controls['account_num'].setValue(this.accNumberPipe.transform(value), {emitEvent: false});
      }
    );
    this.clientAccountForm.controls['annual_fee'].setValue(this.utilsService.currencyFmt(this.clientAccountForm.value['annual_fee']), {emitEvent: false});
    this.clientAccountForm.controls['annual_fee'].valueChanges.subscribe(
      (value:string) => {
        this.clientAccountForm.controls['annual_fee'].setValue(this.utilsService.currencyFmt(value), {emitEvent: false});
      }
    );
    this.clientAccountForm.controls['credit_limit'].setValue(this.utilsService.currencyFmt(this.clientAccountForm.value['credit_limit']), {emitEvent: false});
    this.clientAccountForm.controls['credit_limit'].valueChanges.subscribe(
      (value:string) => {
        this.clientAccountForm.controls['credit_limit'].setValue(this.utilsService.currencyFmt(value), {emitEvent: false});
      }
    );
  }

  getName( ) {
    let bFlag = true;
    for( let ii = 0; bFlag && ii < this.clientPersonList.length; ii++) {
      if( this.clientPersonList[ii].client_id === this.selectedValue) {
        bFlag = false;
        return this.clientPersonList[ii].first_name + ' ' +this.clientPersonList[ii].last_name;
      }
    }
    return null;
  }

  clientChange() {
    console.log( this.selectedValue+' - grandmother operation');
    console.log(this.clientAccountForm);
    if( 0 < this.selectedValue) {
      let name = this.getName( );
      if( name ) {
        this.clientAccountForm.patchValue({name: name})
      }
    }
  }


  onSubmit() {
    //let annual_fee = this.utilsService.toNumber(this.clientAccountForm.value['annual_fee']);
    //let credit_limit = this.utilsService.toNumber(this.clientAccountForm.value['credit_limit']);
    //toNumber
    console.log( this.clientAccountForm.value);
    this.clientAccountService.postClientAccount(this.clientAccountForm.value);
    this.dialogRef.close();
  }

}
