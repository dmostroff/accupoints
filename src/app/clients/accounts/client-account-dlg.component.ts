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
import { AdmTags } from './../../adm/adm-tags';

import { PhonefmtPipe } from './../../utils/phonefmt.pipe';
import { AccnumberPipe } from './../../utils/accnumber.pipe';
import { CurrencyPipe } from '@angular/common'
import {AdmTagsService} from "../../adm/adm-tags.service";

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
  cardStatuses: AdmTags[];
  t: any;

  constructor(private fb:FormBuilder
    , private clientAccountService:ClientAccountService
    , private clientsService:ClientsService
    , private companyService:CcCompanyService
    , private utilsService:UtilsService
    , private admTagsService: AdmTagsService
    , public dialogRef:MatDialogRef<ClientAccount>
    , private accNumberPipe:AccnumberPipe
    , private currencyPipe:CurrencyPipe
    , @Inject(MAT_DIALOG_DATA) public data:ClientAccount) {
    this.clientAccount = data;
    console.log( ['constructor', this.clientAccount])
    this.showPwd=false;
    this.createForm();
    this.clientPerson = new ClientPerson();
    this.cardStatuses = <AdmTags[]>[];
    this.clientPersonList = this.clientsService.clientsList;
    this.ccCards = <CcCards[]>[];
    this.t = [
      { id: 1, name: 'Will' }
      , { id: 2, name: 'John'}
      , { id: 3, name: 'Robot'}
      , { id: 4, name: 'Franz'}
    ]
  }

  private createForm() {
    let account_date = moment(this.clientAccount.account_date).format(); // new Date(new Date(this.clientAccount.account_date).toLocaleDateString( "en-US", { timeZone: "America/New_York"}));
    console.log( account_date);
    this.clientAccount.account_num = this.accNumberPipe.transform(this.clientAccount.account_num);


    console.log(['createForm', this.clientAccount.cc_status]);
    this.clientAccountForm = this.fb.group({
      account_id: this.clientAccount.account_id
      , t_id: 3
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
    this.cardStatusInit();
    this.clientListInit();
    this.ccCardsInit();
    this.init();
  }
  private init() {

    this.clientAccountForm.controls['account_num'].setValue(this.accNumberPipe.transform(this.clientAccountForm.value['account_num']), {emitEvent: false});
    this.clientAccountForm.controls['account_num'].valueChanges.subscribe(
      (value:string) => {
        this.clientAccountForm.controls['account_num'].setValue(this.accNumberPipe.transform(value), {emitEvent: false});
      }
    );
    this.clientAccountForm.controls['annual_fee'].setValue(this.currencyPipe.transform(this.clientAccountForm.value['annual_fee'], 'USD', 'symbol-narrow', '1.2-2'), {emitEvent: false});
    this.clientAccountForm.controls['credit_limit'].setValue(this.utilsService.currencyFmt(this.clientAccountForm.value['credit_limit']), {emitEvent: false});
  }

  private cardStatusInit() {
    if( 0 == this.cardStatuses.length) {
      this.admTagsService.getTags('CARDSTATUS');
    }

    this.admTagsService.admTagsSubject.subscribe( tags => {
      this.cardStatuses = tags;
      console.log( this.cardStatuses);
    });
  }

  private clientListInit() {
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
  }

  private ccCardsInit() {
    if( 0 == this.ccCards.length) {
      this.companyService.getCreditCards();
    }
    this.companyService.ccCompanyCardsSubject.subscribe(ccCards => { this.ccCards = ccCards; })
  }

  private getName( clientId) {
    let bFlag = true;
    for( let ii = 0; bFlag && ii < this.clientPersonList.length; ii++) {
      if( this.clientPersonList[ii].client_id == clientId) {
        console.log( ['getName', ii, this.clientPersonList[ii], this.clientAccountForm.value.client_id])
        this.clientPerson.set(this.clientPersonList[ii]);
        return this.utilsService.formatName( this.clientPerson.first_name, this.clientPerson.middle_name, this.clientPerson.last_name);
      }
    }
    return null;
  }

  transformAmount( $event, name) {
        let v = this.clientAccountForm.controls[name].value.replace( /\$/g, '').replace(/,/, '').replace(/[^\d|\.]/g,'');
        this.clientAccountForm.controls[name].setValue(this.currencyPipe.transform(v, 'USD', 'symbol-narrow', '1.2-2'), {emitEvent: false});

  }
  clientChange(clientId) {

    console.log(['cientchange', clientId]);

    if( 0 < clientId && 0 == this.clientAccountForm.value.name.length) {
      let name = this.getName(clientId);
      this.clientAccountForm.patchValue( {name: name });
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
