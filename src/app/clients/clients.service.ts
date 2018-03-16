import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import { Config } from './../utils/config';
import {CcapiResult} from './../utils/ccapiresult';
import { AuthService } from './../utils/auth.service';

import {ClientPerson} from './clientperson';
import {ClientAddress} from './persons/client-address';

@Injectable()
export class ClientsService {
  apiBaseUrl:string;
  clientListCount:Number;

  public clientsList:ClientPerson[];
  public clientsListSubject:BehaviorSubject<ClientPerson[]> = new BehaviorSubject<ClientPerson[]>([]);
  public clientsPageSubject:BehaviorSubject<ClientPerson[]> = new BehaviorSubject<ClientPerson[]>([]);

  person:ClientPerson;
  public clientSubject:BehaviorSubject<ClientPerson> = new BehaviorSubject<ClientPerson>(new ClientPerson());

  clientAddresses:ClientAddress[];
  public clientAddressesSubject:BehaviorSubject<ClientAddress[]> = new BehaviorSubject<ClientAddress[]>([]);

  clientAddress:ClientAddress;
  public clientAddressSubject:BehaviorSubject<ClientAddress> = new BehaviorSubject<ClientAddress>(new ClientAddress());

  public clientShowModeSubject:BehaviorSubject<boolean[]> = new BehaviorSubject<boolean[]>([]);

  constructor(private http:HttpClient
    , private authService:AuthService) {
    this.apiBaseUrl = 'client';
    this.person = new ClientPerson();
    this.clientsList = <ClientPerson[]>[];
  }

  ngOnInit() {
    console.log("person service init");
  }

  ngOnDestroy() {
    console.log("person service destroy");
  }

  public serviceName( val:string) {
    return val + ' clientService';
  }

  public getHubUsers() {
    let url = 'https://api.github.com/users/jonuts';
    return this.http.get(url)
  }

  public getClientsList() {
    console.log('getClientsList');
    let url = Config.GetUrl('client/person');
    return this.http.get<CcapiResult>(url
      , {headers: new HttpHeaders().set('Authorization', this.authService.token)}
      )
      .subscribe(resp => {
          console.log(resp);
          if (0 == resp.res.rc && resp.data) {
            this.clientsList = resp.data;
            if (this.clientsList) {
              this.clientListCount = this.clientsList.length;
              console.log(["personService.getClientsList", this.clientsList, this.clientsList.length]);
              this.clientsListSubject.next(this.clientsList);
            }
          }
        }
        , err => {
          console.log(err);
        }
      );
  }

  public getClientsListPage(startIndex, pageLength) {
    let p = this.clientsList.slice(startIndex, startIndex + pageLength)
    console.log(["getClientsListPage", startIndex, startIndex + pageLength, p]);
    this.clientsPageSubject.next(p); // 9,2,5
  }

  public clearPersonList() {
    this.clientsListSubject.next([]);
  }

  /* Single Person */
  public getClientById(id:number):ClientPerson {
    return this.clientsList.find(person => person.client_id === id);
  }

  public getClient(client_id) {
    if (!this.person) {
      this.person = new ClientPerson();
    }
    let url = Config.GetUrl('client/person/' + client_id);
    return this.http.get<CcapiResult>(url
      , {headers: new HttpHeaders().set('Authorization', this.authService.token)}
      )
      .subscribe(resp => {
          console.log(resp);
          if (0 == resp.res.rc && resp.data) {
            if( ! this.person) {
              this.person = new ClientPerson();
            }
            this.person.set(resp.data);
            this.clientSubject.next(this.person);
            //this.personChange.next(resp['data']);
          }
        },
        (err:HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client Side Error.");
          } else {
            console.log('wrong');
          }
        }
      );
  }

  public getClientAddresses(client_id) {
    this.clientAddresses = [];
    let url = Config.GetUrl('client/person/' + client_id + '/address');
    return this.http.get<CcapiResult>(url
      , {headers: new HttpHeaders().set('Authorization', this.authService.token)}
      )
      .subscribe(resp => {
          console.log(resp);
          if (0 == resp.res.rc && resp.data) {
            this.clientAddresses = resp.data;
            this.clientAddressesSubject.next(this.clientAddresses);
            //this.personChange.next(resp['data']);
          }
        },
        (err:HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client Side Error.");
          } else {
            console.log('wrong');
          }
        }
      );
  }


  public postClient(input) {
    let myurl = Config.GetUrl('client/person');
    return this.http.post<CcapiResult>(myurl, input
      , {headers: new HttpHeaders().set('Authorization', this.authService.token)}
      )
      .subscribe(resp => {
          console.log(resp);
          if (0 == resp.res.rc && resp.data) {
            this.person.set(resp.data);
            console.log(["1-postCcCard", this.person]);
            this.clientSubject.next(this.person);
          } else {
            console.log(["resdata is null for ", input]);
          }
        }
        , err => {
          console.log(err);
        }
      );
  }

  public postClientAddress(input) {
    let myurl = Config.GetUrl('client/person/address');
    return this.http.post<CcapiResult>(myurl, input
      , {headers: new HttpHeaders().set('Authorization', this.authService.token)}
      )
      .subscribe(resp => {
          console.log(resp);
          if (0 == resp.res.rc && resp.data) {
            this.clientAddress.set(resp.data);
            console.log(["1-postclientAddress", this.clientAddress]);
            this.clientAddressSubject.next(this.clientAddress);
          } else {
            console.log(["resdata is null for ", input]);
          }
        }
        , err => {
          console.log(err);
        }
      );
  }

  public setClientMode(ahowPersonMode:string) {
    let bFlag = ( ahowPersonMode === 'edit');
    this.clientShowModeSubject.next([false, !bFlag, bFlag]);
  }

  public setClientsListMode() {
    this.clientShowModeSubject.next([true, false, false]);
  }


}
