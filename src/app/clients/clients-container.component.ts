import { Component, OnInit } from '@angular/core';

import { ClientsService} from './clients.service';
import { ClientsListComponent } from './persons/clients-list.component';
import { ClientPerson} from './persons/clientperson';

@Component({
  selector: 'app-clients-container',
  templateUrl: './clients-container.component.html',
  styleUrls: ['./clients-container.component.css']
})
export class ClientsContainerComponent implements OnInit {
  clientPerson: ClientPerson;

  constructor( private clientsService: ClientsService) {
    this.clientPerson = new ClientPerson();
  }

  ngOnInit() {
    this.clientsService.clientSubject.subscribe( person => {
      this.clientPerson = person;
    });
  }

}
