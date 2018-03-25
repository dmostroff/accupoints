import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {
  //public authTokenRCSubject:BehaviorSubject<Number> = new BehaviorSubject<Number>(null);
  public authTokenSubject:BehaviorSubject<string> = new BehaviorSubject<string>(null);

  private authToken_: string;
  private isValidUser_: boolean;

  get token(): string { return this.authToken_; }
  set token( tok) { this.authToken_ = tok; }
  get validUser() : boolean { return this.isValidUser_ }
  set validUser( bFlag) { this.isValidUser_ = bFlag; }
  constructor() {
    this.isValidUser_ = false;
    this.authToken_ = null;
    this.authTokenSubject.subscribe( tok => {
      this.authToken_ = tok;
      this.isValidUser_ = ( this.authToken_) ? true : false;
      console.log( "Token set " + this.authToken_);
    })
  }

  public setToken( tok) {
    if( tok && 0 < tok.length) {
      this.authTokenSubject.next(tok);
    } else {
      this.authTokenSubject.next(null);
    }
  }



}
