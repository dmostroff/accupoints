import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject} from 'rxjs';

import { Config } from './../utils/config';
import { CcapiResult } from './../utils/ccapiresult';
import { AuthService } from './../utils/auth.service';
import { CcTransactions } from './accounts/cc-transactions';

@Injectable({
  providedIn: 'root',
})

export class CcTransactionsService {
  apiUrl:string;

  ccTransactionsList:CcTransactions[];
  public ccTransactionsListSubject:BehaviorSubject<CcTransactions[]> = new BehaviorSubject<CcTransactions[]>([]);
  public ccTransactionsPageSubject:BehaviorSubject<CcTransactions[]> = new BehaviorSubject<CcTransactions[]>([]);

  ccTransactions:CcTransactions;
  public ccTransactionsSubject:BehaviorSubject<CcTransactions> = new BehaviorSubject<CcTransactions>(new CcTransactions());

  constructor(private http:HttpClient
    , private authService:AuthService) {
    this.apiUrl = 'account/cc/transactions';
    this.ccTransactions = new CcTransactions();
    this.ccTransactionsList = <CcTransactions[]>[];
  }

  public getCcTransactionsList() {
    let url = Config.GetUrl(this.apiUrl);
    return this.http.get<CcapiResult>(url
      , {headers: new HttpHeaders().set('Authorization', this.authService.token)}
      )
      .subscribe(resp => {
          console.log(resp);
          if (0 == resp.res.rc && resp.data) {
            this.ccTransactionsList = resp.data;
            console.log(this.ccTransactionsList);
            this.ccTransactionsListSubject.next(this.ccTransactionsList);
          }
        }
        , (err:HttpErrorResponse) => {
          if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log('An error occurred:', err.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.log('Backend returned code '+ err.status+ ' body was: '+ err.error);
          }
        }
      );
  }

  public newCcTransactions() {
    this.ccTransactions = new CcTransactions();
    this.ccTransactionsSubject.next(this.ccTransactions);
  }

  public getCcTransactions(id) {
    let url = Config.GetUrl(this.apiUrl+'/' + id);
    return this.http.get<CcapiResult>(url
      , {headers: new HttpHeaders().set('Authorization', this.authService.token)}
      )
      .subscribe(resp => {
          console.log(resp);
          if (0 == resp.res.rc && resp.data) {
            this.ccTransactions = resp.data;
            console.log(["CcTransactionsService.getCcTransactions", this.ccTransactions]);
            this.ccTransactionsSubject.next(this.ccTransactions);
          }
        }
        , err => {
          console.log(err);
        }
      );
  }

  public postCcTransactions(input) {
    let url = Config.GetUrl(this.apiUrl);
    return this.http.post<CcapiResult>(url, input
      , {headers: new HttpHeaders().set('Authorization', this.authService.token)}
      )
      .subscribe(resp => {
          console.log(resp);
          if (0 == resp.res.rc && resp.data) {
            // this.ccTransactions = resp.data;
            console.log(["1-postCcTransactions", resp.data]);
            this.ccTransactionsSubject.next(resp.data);
          } else {
            console.log(["resdata is null for ", resp.data, input]);
          }
        }
        , err => {
          console.log(err);
        }
      );
  }

  public deleteCcTransactions(input) {
    let url = Config.GetUrl(this.apiUrl+'/'+input);
    return this.http.delete<CcapiResult>(url
      , {headers: new HttpHeaders().set('Authorization', this.authService.token)}
      )
      .subscribe(resp => {
          console.log(resp);
        }
        , err => {
          console.log(err);
        }
      );
  }

}
