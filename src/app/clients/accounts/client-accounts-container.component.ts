import { Component, OnInit } from '@angular/core';

import { ClientAccount } from '../client-account';
import { ClientAccountService } from '../client-account.service';
import { ClientAccountListComponent } from './client-account-list.component';
import { ClientAccountsComponent } from './client-accounts.component';

@Component({
  selector: 'client-accounts-container',
  templateUrl: './client-accounts-container.component.html',
  styleUrls: ['./client-accounts-container.component.css']
})
export class ClientAccountsContainerComponent implements OnInit {

  clientAccount: ClientAccount;
  constructor( private clientAccountService: ClientAccountService) {
    this.clientAccount = new ClientAccount();
  }

  ngOnInit() {
    this.clientAccountService.clientAccountSubject.subscribe( account => {
      console.log( ['subscribe', account]);
      this.clientAccount.set(account);
    })
  }

}
