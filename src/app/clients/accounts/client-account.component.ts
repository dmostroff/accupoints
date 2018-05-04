import { Component, OnInit, Input } from '@angular/core';

import { ClientAccount } from './../client-account';
import { ClientAccountService } from './../client-account.service';

@Component({
  selector: 'client-account',
  templateUrl: './client-account.component.html',
  styleUrls: ['./client-account.component.css']
})
export class ClientAccountComponent implements OnInit {
  @Input() clientAccount:ClientAccount;

  constructor( private accountService: ClientAccountService) {
    this.clientAccount = new ClientAccount();
  }

  ngOnInit() {
    this.accountService.clientAccountSubject.subscribe( account => {
      this.clientAccount.set( account);
    });

  }

}
