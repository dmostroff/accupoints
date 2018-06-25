import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject} from 'rxjs';

import { Config } from './../utils/config';
import { CcapiResult } from './../utils/ccapiresult';
import { AuthService } from './../utils/auth.service';
import { CcActions } from './cc-actions';

@Injectable({
  providedIn: 'root',
})

export class CcActionsService {
  apiUrl:string;

  ccActionsList:CcActions[];
  public ccActionsListSubject:BehaviorSubject<CcActions[]> = new BehaviorSubject<CcActions[]>([]);
  public ccActionsPageSubject:BehaviorSubject<CcActions[]> = new BehaviorSubject<CcActions[]>([]);

  ccActions:CcActions;
  public ccActionsSubject:BehaviorSubject<CcActions> = new BehaviorSubject<CcActions>(new CcActions());

  constructor(private http:HttpClient
    , private authService:AuthService) {
    this.apiUrl = '';
    this.ccActions = new CcActions();
    this.ccActionsList = <CcActions[]>[];
  }

  public getCcActionsList() {
    let url = Config.GetUrl(this.apiUrl);
    return this.http.get<CcapiResult>(url
      , {headers: new HttpHeaders().set('Authorization', this.authService.token)}
      )
      .subscribe(resp => {
          console.log(resp);
          if (0 == resp.res.rc && resp.data) {
            this.ccActionsList = resp.data;
            console.log(this.ccActionsList);
            this.ccActionsListSubject.next(this.ccActionsList);
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

  public newCcActions() {
    this.ccActions = new CcActions();
    this.ccActionsSubject.next(this.ccActions);
  }

  public getCcActions(id) {
    let url = Config.GetUrl(this.apiUrl+'/' + id);
    return this.http.get<CcapiResult>(url
      , {headers: new HttpHeaders().set('Authorization', this.authService.token)}
      )
      .subscribe(resp => {
          console.log(resp);
          if (0 == resp.res.rc && resp.data) {
            this.ccActions = resp.data;
            console.log(["CcActionsService.getCcActions", this.ccActions]);
            this.ccActionsSubject.next(this.ccActions);
          }
        }
        , err => {
          console.log(err);
        }
      );
  }

  public postCcActions(input) {
    let url = Config.GetUrl(this.apiUrl);
    return this.http.post<CcapiResult>(url, input
      , {headers: new HttpHeaders().set('Authorization', this.authService.token)}
      )
      .subscribe(resp => {
          console.log(resp);
          if (0 == resp.res.rc && resp.data) {
            // this.ccActions = resp.data;
            console.log(["1-postCcActions", resp.data]);
            this.ccActionsSubject.next(resp.data);
          } else {
            console.log(["resdata is null for ", resp.data, input]);
          }
        }
        , err => {
          console.log(err);
        }
      );
  }

  public deleteCcActions(input) {
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
