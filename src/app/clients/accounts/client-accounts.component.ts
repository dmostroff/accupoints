import { Component, OnInit } from '@angular/core';

import { ClientAccount } from './../client-account';
import { ClientAccountService } from './../client-account.service';

@Component({
  selector: 'client-accounts',
  templateUrl: './client-accounts.component.html',
  styleUrls: ['./client-accounts.component.css']
})
export class ClientAccountsComponent implements OnInit {
  clientAccount:ClientAccount;

  constructor( private accountService: ClientAccountService) {
    this.clientAccount = new ClientAccount();
  }

  ngOnInit() {
    this.accountService.clientAccountSubject.subscribe( account => {
      this.clientAccount.set( account);
    });

  }

}
