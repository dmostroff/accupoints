import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import { Config } from '../utils/config';
import {AuthService} from './../utils/auth.service';
import {AdmUser} from './adm-users';
import {CcapiResult} from '../utils/ccapiresult';


@Injectable()
export class AdmUsersService {
  public admUserSubject:BehaviorSubject<AdmUser> = new BehaviorSubject<AdmUser>(null);
  public admUserInLoginSubject:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  public admUser:AdmUser;
  private apiBaseUrl: String;

  constructor(
    private http:HttpClient
    , private authService:AuthService) {
    this.apiBaseUrl = 'admin/users';
    this.admUser = new AdmUser();
    this.admUser.email = 'dano';
    this.admUser.user_name = 'dano';
  }

  public inLogin( bFlag:boolean) {
    this.admUserInLoginSubject.next(bFlag);
  }

  public init() {
    this.admUser.login = localStorage.getItem('login');
  }

  public login(input) {
    this.authService.validUser = false;
    let myurl = Config.GetUrl(this.apiBaseUrl + '/login');
    const req = this.http.post<CcapiResult>( myurl, input)
      .subscribe(resp => {
          console.log(resp);
          if (0 == resp.res.rc && resp.data) {
            this.admUser.set(resp.data);
            //  console.log( ["1-login", this.admUser]);
            this.admUserSubject.next(this.admUser);
            //this.authService.authTokenRCSubject.next(0);
            localStorage.setItem('login', this.admUser.login);
            this.authService.setToken(this.admUser.token);
          } else {
            this.authService.setToken(null);
            console.log(["resdata is null for ", resp, input]);
          }
        }
        , err => {
          this.authService.setToken(null);
          console.log(err);
        }
      );
  }

  public logout(input) {
    let myurl = Config.GetUrl(this.apiBaseUrl + '/logout');
    const req = this.http.post<CcapiResult>( myurl, input)
      .subscribe(resp => {
          console.log(resp);
          if (0 == resp.res.rc && resp.data) {
            if (this.admUser.user_id > 0) {
              this.admUser.clear();
              console.log(["1-logout", this.admUser]);
              this.admUserSubject.next(this.admUser);
            }
            this.authService.validUser = false;
            //this.authService.authTokenRCSubject.next(9);
          }
        }
        , err => {
          console.log(err);
        }
      );
  }

}
