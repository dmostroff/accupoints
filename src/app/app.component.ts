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

export class AppComponent implements OnInit, AfterViewInit  {
  title: String = "AquiPoints";
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
      { path: "cc/companylist", label: "CCard Companies", active: true, id: 'companylist' }
      , { path: "clients/list", label: "Clients", active: true, id: 'clientlist'}
      , { path: "clients/accounts", label: "Accounts", active: true, id: 'clientaccounts' }
    ];

  }

  ngOnInit() {
    console.log( 'ngOnInit');
    this.authService.authTokenSubject.subscribe( tok => {
      this.isValidUser = this.authService.validUser;
      this.router.navigate( ['clients', 'accounts']);
      //this.router.navigateByUrl('/clients/list'); // clients/accounts']);
      console.log(this.isValidUser);
    });
    this.admUsersService.admUserSubject.subscribe( admUser => {
      this.admUser.set( admUser);
      console.log(this.admUser);
    });
  }
  ngAfterViewInit() {
    this.inLogin = this.loginchild.inLogin;
    console.log(this.inLogin);
  }

  logout() {
    this.admUsersService.logout(this.admUser);
  }

}
