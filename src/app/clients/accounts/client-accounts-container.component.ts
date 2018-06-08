import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material'

import { ClientAccount } from '../client-account';
import { ClientAccountService } from '../client-account.service';
import { ClientAccountListComponent } from './client-account-list.component';
import { ClientAccountComponent } from './client-account.component';
import { ClientAccountDlgComponent } from './client-account-dlg.component';

@Component({
  selector: 'client-accounts-container',
  templateUrl: './client-accounts-container.component.html',
  styleUrls: ['./client-accounts-container.component.css']
})
export class ClientAccountsContainerComponent implements OnInit {

  clientAccount: ClientAccount;
  constructor( private accountService: ClientAccountService
    , public dialog:MatDialog) {
    this.clientAccount = new ClientAccount();
  }

  ngOnInit() {
    this.accountService.clientAccountSubject.subscribe( account => {
      console.log( ['subscribe', account]);
      this.clientAccount.set(account);
    })
  }

  addAccount() {
    // this.accountService.newClientAccount();
    this.clientAccount = new ClientAccount();
    let dialogRef = this.dialog.open(ClientAccountDlgComponent,{ width: '80%', data: this.clientAccount });
    //
    dialogRef.afterClosed().subscribe(result => {
      console.log(['The dialog was closed', result]);
      this.accountService.clientAccountSubject.next( result);
    });

  }

}
