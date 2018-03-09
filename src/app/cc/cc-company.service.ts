import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import { Config } from './../utils/config';
import {CcapiResult} from './../utils/ccapiresult';
import { AuthService } from './../utils/auth.service';

import {CcCompany} from './cc-company';
import {CcCards} from './cc-cards';

@Injectable()
export class CcCompanyService {

  ccCompanyList:CcCompany[];
  ccCompanyId:number;

  public ccCompanyListSubject:BehaviorSubject<CcCompany[]> = new BehaviorSubject<CcCompany[]>([]);

  ccCompany:CcCompany;
  public ccCompanySubject:BehaviorSubject<CcCompany> = new BehaviorSubject<CcCompany>(null);

  ccCompanyCards:CcCards[];
  ccCard:CcCards;
  public ccCompanyCardsSubject:BehaviorSubject<CcCards[]> = new BehaviorSubject<CcCards[]>([]);
  public ccCardSubject:BehaviorSubject<CcCards> = new BehaviorSubject<CcCards>(null);

  constructor(private http:HttpClient
    , private authService:AuthService) {
    this.ccCompany = new CcCompany();
    this.ccCompanyList = <CcCompany[]>[];
    this.ccCompanyCards = <CcCards[]>[];
    this.ccCard = new CcCards();
  }

  public getCompanyList() {
    let url = Config.GetUrl('cc/company');
    return this.http.get<CcapiResult>(url
      , {headers: new HttpHeaders().set('Authorization', this.authService.token)}
      )
      .subscribe(resp => {
          console.log(resp);
          if (0 == resp.res.rc && resp.data) {
            this.ccCompanyList = resp.data;
            console.log(["getCompanyList", this.ccCompanyList, this.ccCompanyList.length]);
            this.ccCompanyListSubject.next(this.ccCompanyList);
          }
        }
        , err => {
          this.ccCompanyListSubject.next(null);
          console.log(err);
        }
      );
  }

  public getCompany(cc_company_id) {
    let url = Config.GetUrl('cc/company/' + cc_company_id);
    return this.http.get<CcapiResult>(url
      , {headers: new HttpHeaders().set('Authorization', this.authService.token)}
      )
      .subscribe(resp => {
          console.log(resp);
          if (0 == resp.res.rc && resp.data) {
            this.ccCompany.set(resp.data);
            //console.log( this.ccCompany);
            this.ccCompanySubject.next(this.ccCompany);
          }
        }
        , err => {
          console.log(err);
        }
      );
  }

  public
  getCreditCards() {
    let url = Config.GetUrl('cc/cards');
    return this.http.get<CcapiResult>(url
      , {headers: new HttpHeaders().set('Authorization', this.authService.token)}
      )
      .subscribe(resp => {
          console.log(resp);
          if (0 == resp.res.rc && resp.data) {
            this.ccCompanyCards = resp.data;
            console.log(['service getCreditCards', this.ccCompanyCards]);
            this.ccCompanyCardsSubject.next(this.ccCompanyCards);
          }
        }
        , err => {
          console.log(err);
          this.ccCompanyCardsSubject.next(null);
        }
      );
  }

  public
  getCompanyCards(cc_company_id) {
    this.ccCompanyCardsSubject.next([]);
    let url = Config.GetUrl('cc/cards/' + cc_company_id);
    return this.http.get<CcapiResult>(url
      , {headers: new HttpHeaders().set('Authorization', this.authService.token)}
      )
      .subscribe(resp => {
          console.log(resp);
          if (0 == resp.res.rc && resp.data) {
            this.ccCompanyCards = resp.data;
            console.log(['service getCompanyCards', this.ccCompanyCards]);
            this.ccCompanyCardsSubject.next(this.ccCompanyCards);
          }
        }
        , err => {
          console.log(err);
        }
      );
  }

  public
  getCcCard(cc_card_id) {
    let url = Config.GetUrl('cc/cards/' + cc_card_id);
    return this.http.get<CcapiResult>(url
      , {headers: new HttpHeaders().set('Authorization', this.authService.token)}
      )
      .subscribe(resp => {
          console.log(resp);
          if (0 == resp.res.rc && resp.data) {
            this.ccCard.set(resp.data);
            this.ccCardSubject.next(this.ccCard);
            console.log(["service ccCard", this.ccCard]);
          }
        }
        , err => {
          console.log(err);
        }
      );
  }

  public
  postCompany(input) {
    let url = Config.GetUrl('cc/company');
    console.log(["0-postCompany", input, this.ccCompany]);
    return this.http.post<CcapiResult>(url, input
      , {headers: new HttpHeaders().set('Authorization', this.authService.token)}
      )
      .subscribe(resp => {
          console.log(resp);
          if (0 == resp.res.rc && resp.data) {
            this.ccCompany.set(resp.data);
            console.log(["1-postCompany", this.ccCompany]);
            this.ccCompanySubject.next(this.ccCompany);
          }
        }
        , err => {
          console.log(err);
        }
      );
  }

  public postCcCard(input) {
    let url = Config.GetUrl('cc/cards');
    console.log(["0-postCcCard", input, this.ccCard]);
    return this.http.post<CcapiResult>(url, input
      , {headers: new HttpHeaders().set('Authorization', this.authService.token)}
      )
      .subscribe(resp => {
          console.log(resp);
          if (0 == resp.res.rc && resp.data) {
            this.ccCard.set(resp.data);
            console.log(["1-postCcCard", this.ccCard]);
            this.ccCardSubject.next(this.ccCard);
          }
        }
        , err => {
          console.log(err);
        }
      );
  }

}
