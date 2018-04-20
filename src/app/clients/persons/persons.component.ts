import { Component, OnInit, Input } from '@angular/core';
import { MatButton, MatDialog} from '@angular/material';

import { ClientsService} from './../clients.service';
import { PersonDlgComponent } from './person-dlg.component';

import { ClientPerson } from './clientperson'
@Component({
  selector: 'client-person',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {

  @Input() clientPerson: ClientPerson;

  constructor(     private clientsService: ClientsService
    , public dialog:MatDialog
  ) { }

  ngOnInit() {
  }

  openDialog(clientPerson): void {
    let dialogRef = this.dialog.open(PersonDlgComponent,{ width: '80%', data: this.clientPerson });
    //
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.clientsService.person = result;
    });
  }

}
