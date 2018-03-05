import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {
  //public authTokenRCSubject:BehaviorSubject<Number> = new BehaviorSubject<Number>(null);
  public authTokenSubject:BehaviorSubject<String> = new BehaviorSubject<String>(null);

  private authToken: string;
  private isValidUser: boolean;

  public getToken(): string { return this.authToken; }
  public setToken( tok) { this.authToken = tok; }
  public validUser(): boolean { return this.isValidUser}
  public setValidUser( bFlag) { this.isValidUser = bFlag; }
  constructor() {
    this.isValidUser = false;
  }

}
