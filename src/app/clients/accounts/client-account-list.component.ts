import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatPaginator, MatSort, MatButton} from '@angular/material';

import {DataSource} from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


import { ClientAccount } from '../client-account';
import { ClientAccountService } from '../client-account.service';
import { ClientAccountDlgComponent } from './client-account-dlg.component';

@Component({
  selector: 'app-client-account-list',
  templateUrl: './client-account-list.component.html',
  styleUrls: ['./client-account-list.component.css']
})
export class ClientAccountListComponent implements OnInit {
  displayedColumns = ['account_id', 'name', 'account_num', 'recorded_on', 'edit'];
  clientAccount: ClientAccount;
  clientAccountList: ClientAccount[];
  showTable: boolean;
  dataSource: ClientAccountDataSource;
  dataLength: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog:MatDialog
    ,private accountService: ClientAccountService) {
    this.clientAccount = new ClientAccount();
  }

  ngOnInit() {
    this.accountService.getClientAccounts();
    this.dataSource = new ClientAccountDataSource(this.accountService, this.paginator); // , this.paginator, this.sort);
    this.dataLength = this.dataSource.dataLength;
    this.accountService.clientAccountListSubject.subscribe( accountList =>
    {
      this.dataLength = this.dataSource.dataLength;
      this.clientAccountList = accountList;
      if(0 < this.paginator.pageSize) {
        this.showTable = true;
        this.accountService.getClientAccountListPage(this.paginator.pageIndex, this.paginator.pageSize);
      }
    });
  }

  showClientAccount( clientAccount: ClientAccount) {
    alert( 'Show Client] '+clientAccount.account_num+':'+clientAccount.name);
  }

  getServerData($event) {
    console.log($event);
    this.dataSource.readData();
  }
  openDialog(clientAccount): void {
    let dialogRef = this.dialog.open(ClientAccountDlgComponent,{ width: '80%', data: clientAccount });
    //
    dialogRef.afterClosed().subscribe(result => {
      console.log(['The dialog was closed', result]);
      this.accountService.clientAccountSubject.next( result);
    });
  }


}

export class ClientAccountDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter( filter:string) { this._filterChange.next(filter); }

  filteredData: ClientAccount[] = [];
  renderedData: ClientAccount[] = [];
  dataLength: number;

  constructor(
    private _accountService: ClientAccountService
    , private _paginator: MatPaginator
    //, private _sort: MatSort
  ) {
    super();
    //console.log( 'cons')    ;
    this.dataLength = 0;
    if( this._accountService && this._accountService.clientAccountList) {
      this.dataLength = this._accountService.clientAccountList.length;
    }
    //this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<ClientAccount[]> {
    console.log( 'connect');
    //this._clientsService.getPersonListPage(1, this._paginator.pageSize);
    //Observable.combineLatest(displayDataChanges);
    this._accountService.clientAccountPageSubject.subscribe(pagelist => {
      if( pagelist) {
        this.renderedData = pagelist;
        this.dataLength = this._accountService.clientAccountList.length;
      } else {
        console.log( "clientAccountPage undefined");
      }
    });
    return this._accountService.clientAccountPageSubject;
  }

  disconnect() {
    //this._clientsService.personsPageSubject.unsubscribe( );

  }

  readData() {
    console.log( 'readData');
    if(0 < this._paginator.pageSize ) {
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      console.log(['mamas', startIndex, this._paginator.pageIndex, this._paginator.pageSize]);
      this._accountService.getClientAccountListPage(startIndex, this._paginator.pageSize);

    }
  }
}
