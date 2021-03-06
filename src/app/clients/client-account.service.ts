import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import {Observable, Subject, BehaviorSubject} from 'rxjs';

import { Config } from './../utils/config';
import { CcapiResult } from './../utils/ccapiresult';
import { AuthService } from './../utils/auth.service';
import { ClientAccount } from './client-account';

@Injectable({
  providedIn: 'root',
})

export class ClientAccountService {
  apiUrl:string;

  clientAccountList:ClientAccount[];
  public clientAccountListSubject:BehaviorSubject<ClientAccount[]> = new BehaviorSubject<ClientAccount[]>([]);
  public clientAccountPageSubject:BehaviorSubject<ClientAccount[]> = new BehaviorSubject<ClientAccount[]>([]);

  clientAccountsPerson:ClientAccount[];
  public clientAccountsPersonSubject:BehaviorSubject<ClientAccount[]> = new BehaviorSubject<ClientAccount[]>([]);

  clientAccount:ClientAccount;
  public clientAccountSubject:BehaviorSubject<ClientAccount> = new BehaviorSubject<ClientAccount>(new ClientAccount());

  constructor(private http:HttpClient
    , private authService:AuthService) {
    this.apiUrl = 'account';
    this.clientAccount = new ClientAccount();
    this.clientAccountsPerson = <ClientAccount[]>[];
    this.clientAccountList = <ClientAccount[]>[];
  }


  public getClientAccounts() {
    let url = Config.GetUrl(this.apiUrl);
    return this.http.get<CcapiResult>(url
      , {headers: new HttpHeaders().set('Authorization', this.authService.token)}
      )
      .subscribe(resp => {
          console.log(resp);
          if (0 == resp.res.rc && resp.data) {
            this.clientAccountList = resp.data;
            console.log(this.clientAccountList);
            this.clientAccountListSubject.next(this.clientAccountList);
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
    let url = Config.GetUrl(this.apiUrl+'/person/' + client_id);
    return this.http.get<CcapiResult>(url
      , {headers: new HttpHeaders().set('Authorization', this.authService.token)}
      )
      .subscribe(resp => {
          console.log(resp);
          if (0 == resp.res.rc && resp.data) {
            this.clientAccountsPerson = resp.data;
            console.log(["ClientAccountService.getClientAccountsPerson", this.clientAccountsPerson, this.clientAccountsPerson.length]);
            this.clientAccountsPersonSubject.next(this.clientAccountsPerson);
          }
        }
        , err => {
          console.log(err);
          this.clientAccountListSubject.next(null);
        }
      );
  }


  public newClientAccount() {
    this.clientAccount = new ClientAccount();
    this.clientAccountSubject.next(this.clientAccount);
  }

  public getClientAccount(account_id) {
    let url = Config.GetUrl(this.apiUrl+'/' + account_id);
    return this.http.get<CcapiResult>(url
      , {headers: new HttpHeaders().set('Authorization', this.authService.token)}
      )
      .subscribe(resp => {
          console.log(resp);
          if (0 == resp.res.rc && resp.data) {
            this.clientAccount = resp.data;
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
    let url = Config.GetUrl(this.apiUrl);
    return this.http.post<CcapiResult>(url, input
      , {headers: new HttpHeaders().set('Authorization', this.authService.token)}
      )
      .subscribe(resp => {
          console.log(resp);
          if (0 == resp.res.rc && resp.data) {
            // this.clientAccount = resp.data;
            console.log(["1-postClientAccount", resp.data]);
            this.clientAccountSubject.next(resp.data);
          } else {
            console.log(["resdata is null for ", resp.data, input]);
          }
        }
        , err => {
          console.log(err);
        }
      );
  }

  public deleteClientAccount(input) {
    let url = Config.GetUrl(this.apiUrl+'/'+input);
    return this.http.delete<CcapiResult>(url, input)
      .subscribe(resp => {
          console.log(resp);
          //if (0 == resp.res.rc && resp.data) {
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
          //}
        }
        , err => {
          console.log(err);
        }
      );
  }

}
