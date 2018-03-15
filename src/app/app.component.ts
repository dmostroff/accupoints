import { Component,  ViewChild, OnInit, AfterViewInit  } from '@angular/core';
import { MatTabsModule} from '@angular/material'
import { Router } from "@angular/router";

import { AdmUser} from './adm/adm-users';
import { LoginComponent } from './adm/login.component';

/* services */
import { AdmUsersService } from './adm/adm-users.service';
import { AuthService } from './utils/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit  {
  title: String = "AccuPoints";
  version: String = "1.01";
  admUser: AdmUser;
  public navLinks: any[];
  validToken: boolean;
  isValidUser: boolean;
  inLogin: boolean;

  @ViewChild(LoginComponent) loginchild;

  constructor(
    private router: Router
    , private admUsersService: AdmUsersService
    , private authService: AuthService) {
    this.validToken = false;
    this.admUser = new AdmUser();
    this.isValidUser = false;
    this.navLinks = [
      { path: "clients/accounts", label: "Accounts", active: true, id: 'clientaccounts' }
      , { path: "clients/list", label: "Clients", active: true, id: 'clientlist'}
      , { path: "cc/companylist", label: "CCard Companies", active: true, id: 'companylist' }
    ];

  }

  ngOnInit() {
    console.log( 'ngOnInit');
    this.authService.authTokenSubject.subscribe( tok => {
      this.isValidUser = this.authService.validUser;
      if( this.isValidUser) {
        this.router.navigate( ['clients', 'accounts']);
      } else {
        this.router.navigate( ['login']);
      }
      console.log(this.isValidUser);
    });

    this.admUsersService.admUserSubject.subscribe( admUser => {
      this.admUser.set( admUser);
      console.log(this.admUser);
    });

    this.admUsersService.admUserInLoginSubject.subscribe( bFlag => {
      this.inLogin = bFlag;
    })
  }

  logout() {
    this.admUsersService.logout(this.admUser);
  }

}
