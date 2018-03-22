import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule  } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import * as moment from 'moment'; // add this 1 of 4

import { ClientsService } from './../clients.service';
import { CcCompanyService } from './../../cc/cc-company.service';
import { UtilsService } from './../../utils/utils.service';

import { ClientAccount } from './../client-account';
import { ClientAccountService } from './../client-account.service';
import { ClientPerson } from './../clientperson';
import { CcCards } from './../../cc/cc-cards';

import { PhonefmtPipe } from './../../utils/phonefmt.pipe';
import { AccnumberPipe } from './../../utils/accnumber.pipe';
import { CurrencyPipe } from '@angular/common'

@Component({
  selector: 'app-client-account-dlg',
  templateUrl: './client-account-dlg.component.html',
  styleUrls: ['./client-account-dlg.component.css']
})

export class ClientAccountDlgComponent {
  title:string;
  clientAccount:ClientAccount;
  accountDate:Date;
  showPwd: boolean;

  clientAccountForm:FormGroup;
  clientAccountFormControl:FormControl;

  clientPersonList:ClientPerson[];
  clientPerson: ClientPerson;
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
    , private currencyPipe:CurrencyPipe
    , @Inject(MAT_DIALOG_DATA) public data:ClientAccount) {
    this.clientAccount = data;
    companyService.ccCompanyCardsSubject.subscribe(data => {
      this.ccCards = data;
    });
    this.showPwd=false;
    this.createForm();
    this.clientPerson = new ClientPerson();
  }

  createForm() {
    let account_date = moment(this.clientAccount.account_date).format(); // new Date(new Date(this.clientAccount.account_date).toLocaleDateString( "en-US", { timeZone: "America/New_York"}));
    console.log( account_date);
    this.clientAccount.account_num = this.accNumberPipe.transform(this.clientAccount.account_num);


    console.log(['createForm', this.clientAccount.account_date]);
    this.clientAccountForm = this.fb.group({
      account_id: this.clientAccount.account_id
      , client: this.clientPerson
      , client_id: this.clientAccount.client_id
      , cc_card_id: this.clientAccount.cc_card_id
      , name: this.clientAccount.name
      , account: this.clientAccount.account
      , account_num: this.clientAccount.account_num
      , account_info: this.clientAccount.account_info
      , account_date: account_date
      , cc_login: this.clientAccount.cc_login
      , cc_password: this.clientAccount.cc_password
      , cc_status: this.clientAccount.cc_status
      , annual_fee: this.clientAccount.annual_fee
      , credit_limit: this.clientAccount.credit_limit
      , addtional_card: this.clientAccount.addtional_card
    });

  }

  ngOnInit() {
    this.clientPersonList = this.clientsService.clientsList;
    if( this.clientPersonList && 0 == this.clientPersonList.length) {
      this.clientsService.getClientsList();
      console.log( [this.clientPersonList, 'clientPersonList' ]);
    } else {
      this.clientPersonList.forEach( client => {
        if( client.client_id == this.clientAccount.client_id) {
          console.log( client);
          this.clientPerson.set(client);
        }
      });
    }

    this.clientsService.clientsListSubject.subscribe(clients => { this.clientPersonList = clients; })
    this.clientAccountForm.controls['account_num'].setValue(this.accNumberPipe.transform(this.clientAccountForm.value['account_num']), {emitEvent: false});
    this.clientAccountForm.controls['account_num'].valueChanges.subscribe(
      (value:string) => {
        this.clientAccountForm.controls['account_num'].setValue(this.accNumberPipe.transform(value), {emitEvent: false});
      }
    );
    this.clientAccountForm.controls['annual_fee'].setValue(this.currencyPipe.transform(this.clientAccountForm.value['annual_fee'], 'USD', 'symbol-narrow', '1.2-2'), {emitEvent: false});
    this.clientAccountForm.controls['credit_limit'].setValue(this.utilsService.currencyFmt(this.clientAccountForm.value['credit_limit']), {emitEvent: false});
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

  transformAmount( $event, name) {
        let v = this.clientAccountForm.controls[name].value.replace( /\$/g, '').replace(/,/, '').replace(/[^\d|\.]/g,'');
        this.clientAccountForm.controls[name].setValue(this.currencyPipe.transform(v, 'USD', 'symbol-narrow', '1.2-2'), {emitEvent: false});

  }
  clientChange() {
    this.clientAccountForm.patchValue( {client_id: this.clientPerson.client_id });
    console.log( ['clientChange', this.clientPerson, this.clientAccount.client_id]);
    //console.log(this.clientAccountForm);
    if( 0 < this.clientPerson.client_id && 0 == this.clientAccountForm.value.name.length) {
      let name = '';
      if( this.clientPerson.first_name) { name += this.clientPerson.first_name; }
      if( this.clientPerson.middle_name) { name += ' ' + this.clientPerson.middle_name; }
      if( this.clientPerson.last_name) { name = (name.trim()) + ' ' + this.clientPerson.last_name; }
      this.clientAccountForm.patchValue( {name: name.trim() });
    }
  }

  onClickCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    //let annual_fee = this.utilsService.toNumber(this.clientAccountForm.value['annual_fee']);
    //let credit_limit = this.utilsService.toNumber(this.clientAccountForm.value['credit_limit']);
    //toNumber
    let account_date = new Date(this.clientAccountForm.value['account_date']);
    let y = account_date.getFullYear() + '-' + (1+account_date.getMonth()) +'-'+account_date.getDate()
    this.clientAccountForm.controls['account_date'].setValue(y, {emitEvent: false});
    console.log( [account_date, y, this.clientAccountForm.value['account_date']]);
    console.log( this.clientAccountForm.value);
    this.clientAccountService.postClientAccount(this.clientAccountForm.value);
    this.dialogRef.close();
  }

}
