import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from "@angular/router";
import {DataSource} from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import {MatPaginator, MatSort, MatButton} from '@angular/material';

import { ClientsService} from './../clients.service';
import { ClientPerson} from './../clientperson';
import { PersonDlgComponent } from './person-dlg.component';

@Component({
  selector: 'client-personslist',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class PersonsListComponent implements OnInit {
  displayedColumns = ['client_id', 'last_name', 'first_name', 'recorded_on', 'edit'];
  //persons: ClientPerson[];
  dataSource: ClientPersonDataSource;
  dataLength: number;
  showTable: boolean;
  showPersonDisplay: boolean;
  showPersonEdit: boolean;

  clientsList: ClientPerson[];
  clientsListSubscription: Subscription;

  person: ClientPerson;
  personSubscription: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  //@ViewChild(MatSort) sort: MatSort;
  //@ViewChild('filter') filter: ElementRef;

  constructor(
    private clientsService: ClientsService
    , private router:Router
    //, public dialog: MatDialog
  ) {
    this.dataLength = 0;
    this.showTable = false;
    this.showPersonDisplay = false;
    this.showPersonEdit = false;

    // this.personSubscription = this.personService.getPerson().subscribe( aperson => { this.person = aperson; });
    //this.persons = personService.persons;
  }

  ngOnInit() {
    this.dataSource = new ClientPersonDataSource(this.clientsService, this.paginator); // , this.paginator, this.sort);
    this.clientsService.clientsListSubject.subscribe( clientsList => {
      console.log(["1.clientsListSubject", clientsList, this.paginator.pageIndex, this.paginator.pageSize]);
      if( 0 < clientsList.length) {
        this.clientsList = clientsList;
        if(0 < this.paginator.pageSize) {
          this.showTable = true;
          this.clientsService.getClientsListPage(this.paginator.pageIndex, this.paginator.pageSize);
        }
      }
    });
    this.clientsService.clientSubject.subscribe( person => {
      this.person = person;
    });
    this.clientsService.clientShowModeSubject.subscribe( showMode => {
      this.showTable = showMode[0];
      this.showPersonDisplay = showMode[1];
      this.showPersonEdit = showMode[2];
    });
    console.log( 'getPersonsList');
    this.clientsService.getClientsList();
    this.clientsService.setClientsListMode();

//    this.personService.getPersonListPage(this.paginator.pageIndex, this.paginator.pageSize);
  }

  ngOnDestroy() {
    //this.personService.clientsListSubject.unsubscribe();
  }

  getServerData($event) {
    console.log($event);
    this.dataSource.readData();
  }

  testButton() {
    console.log( 'testButton');
    this.dataSource.readData();
  }

  showPerson(p) {
    this.clientsService.getClient(p.client_id);
    this.clientsService.setClientMode('show');
  }

  showDetail(rowd) {
    console.log( ["showDetail", rowd])
    this.router.navigate(['/clients/persons', {outlets: {'person' : [rowd.client_id]}}]);
  }

  onClick(p) {
    console.log(p);
    this.clientsService.getClient(p.client_id);
    this.clientsService.setClientMode('edit');
  }

  openDialog(p): void {
    //let dialogRef = this.dialog.open(PersonDlgComponent,{ width: '80%', data: { clientPerson: p }});
    //
    //dialogRef.afterClosed().subscribe(result => {
    //  console.log('The dialog was closed');
    //  this.clientsService.person = result;
    //});
  }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ClientPersonDataSource extends DataSource<any> {
//  _dataSource = new BehaviorSubject<ClientPerson[]>([]);
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter( filter:string) { this._filterChange.next(filter); }

  filteredData: ClientPerson[] = [];
  renderedData: ClientPerson[] = [];
  dataLength: Number;

  constructor(
    private _clientsService: ClientsService
    , private _paginator: MatPaginator
    //, private _sort: MatSort
  ) {
    super();
    //console.log( 'cons')    ;
    this.dataLength = 0;
    if( this._clientsService && this._clientsService.clientsList) {
      this.dataLength = this._clientsService.clientsList.length;
    }
    //this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<ClientPerson[]> {
    console.log( 'connect');
    //this._clientsService.getPersonListPage(1, this._paginator.pageSize);
    //Observable.combineLatest(displayDataChanges);
    this._clientsService.clientsPageSubject.subscribe(clientspagelist => {
      if( clientspagelist) {
        console.log( ["personsPageSubject", clientspagelist, this._clientsService.clientsList])
        this.renderedData = clientspagelist;
        this.dataLength = this._clientsService.clientsList.length;
        //this.dataLength = clientslist.length; // this._clientsService.clientsList.length;
      } else {
        console.log( "clientsList undefined");
      }
    });
    return this._clientsService.clientsPageSubject;
  }

  disconnect() {
    //this._clientsService.personsPageSubject.unsubscribe( );

  }

  readData() {
    console.log( 'readData');
    if(0 < this._paginator.pageSize ) {
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      console.log(['mamas', startIndex, this._paginator.pageIndex, this._paginator.pageSize]);
      this._clientsService.getClientsListPage(startIndex, this._paginator.pageSize);

    }
  }
}
