import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import { Config } from './../utils/config';
import {CcapiResult} from './../utils/ccapiresult';
import { ClientAccount } from './client-account';

@Injectable()
export class ClientAccountService {
  apiUrl:string;

  clientAccountList:ClientAccount[];
  public clientAccountListSubject:BehaviorSubject<ClientAccount[]> = new BehaviorSubject<ClientAccount[]>([]);
  public clientAccountPageSubject:BehaviorSubject<ClientAccount[]> = new BehaviorSubject<ClientAccount[]>([]);

  clientAccountsPerson:ClientAccount[];
  public clientAccountsPersonSubject:BehaviorSubject<ClientAccount[]> = new BehaviorSubject<ClientAccount[]>([]);

  clientAccount:ClientAccount;
  public clientAccountSubject:BehaviorSubject<ClientAccount> = new BehaviorSubject<ClientAccount>(new ClientAccount());

  constructor(private http:HttpClient) {
    this.apiUrl = 'http://ccapi.com//client/accounts';
    this.clientAccount = new ClientAccount();
    this.clientAccountsPerson = <ClientAccount[]>[];
    this.clientAccountList = <ClientAccount[]>[];
  }


  public getClientAccounts() {
    let url = Config.GetUrl( 'client/accounts');
    if (!url) {
      return null;
    }
    return this.http.get<CcapiResult>(url)
      .subscribe(
        resdata => {
          console.log(["ClientAccountService.getclientAccountList", resdata]);
          if (resdata) {
            if (resdata.res.rc != 0) {
              this.clientAccountListSubject.next(null);
            } else {
              if (resdata.data && resdata.data.length > 0) {
                this.clientAccountList = resdata.data;
                console.log(this.clientAccountList);
                this.clientAccountListSubject.next(this.clientAccountList);
              }
            }
          }
        }
        , (err:HttpErrorResponse) => {
          if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log('An error occurred:', err.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          }
          //, err => {
          //  if( err.status == 401) {
          //    console.log( err.status);
          //    return this.authService.authTokenRCSubject.next(-1);
          //  }
          //  console.log(err);
          //}
        }
      );
  }

  public getClientAccountListPage(startIndex, pageLength) {
    let p = this.clientAccountList.slice(startIndex, startIndex + pageLength)
    this.clientAccountPageSubject.next(p); // 9,2,5
  }

  public getClientAccountsPerson(client_id) {
    let url = Config.GetUrl( 'client/accounts/person/' + client_id);
    return this.http.get<CcapiResult>(url)
      .subscribe(
        resdata => {
          if (resdata.res.rc != 0) {
            this.clientAccountsPersonSubject.next(null);
          } else {
            this.clientAccountsPerson = resdata.data;
            console.log(["ClientAccountService.getClientAccountsPerson", this.clientAccountsPerson, this.clientAccountsPerson.length]);
            this.clientAccountsPersonSubject.next(this.clientAccountsPerson);
          }
        }
        , err => {
          console.log(err);
          this.clientAccountListSubject.next(-1);
        }
      );
  }

  public getClientAccount(account_id) {
    let url = Config.GetUrl( 'client/accounts/' + account_id);
    return this.http.get<CcapiResult>(this.apiUrl)
      .subscribe(
        resdata => {
          console.log([resdata, 'getClientAccount']);
          if (resdata.res.rc != 0) {
            this.clientAccountSubject.next(null);
          } else {
            this.clientAccount = resdata.data;
            console.log(["ClientAccountService.getClientAccount", this.clientAccount]);
            this.clientAccountSubject.next(this.clientAccount);
          }
        }
        , err => {
          console.log(err);
        }
      );
  }


  public postClientAccount(input) {
    let url = Config.GetUrl( 'client/accounts');
    return this.http.post<CcapiResult>(url, input)
      .subscribe(
        resdata => {
          if (resdata.res.rc != 0) {
            this.clientAccountSubject.next(null);
          } else {
            if (resdata.data) {
              this.clientAccount.set(resdata.data);
              console.log(["1-postClientAccount", this.clientAccount]);
              this.clientAccountSubject.next(this.clientAccount);
            } else {
              console.log(["resdata is null for ", resdata, input]);
            }
          }
        }
        , err => {
          console.log(err);
        }
      );
  }

  public deleteClientAccount(input) {
    let url = Config.GetUrl( 'client/accounts');
    return this.http.delete<CcapiResult>(url, input)
      .subscribe(
        resdata => {
          //if( resdata.res.rc != 0) {
          //  this.authService.authTokenSubject.next(resdata.res.rc);
          //} else {
          //  if (resdata.data) {
          //    this.clientAccount.set(resdata['data']);
          //    console.log( ["1-deleteClientAccount", this.clientAccount]);
          //    this.clientAccountSubject.next(resdata['data']);
          //  } else {
          //    console.log( ["resdata is null for ", resdata, input]);
          //  }
          //}
        }
        , err => {
          console.log(err);
        }
      );
  }

}
