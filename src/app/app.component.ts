import { Component,  ViewChild, AfterViewInit  } from '@angular/core';
import { MatTabsModule} from '@angular/material'
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

export class AppComponent implements AfterViewInit  {
  title: String = "AquiPoints";
  version: String = "1.01";
  admUser: AdmUser;
  navLinks: any[];
  validToken: boolean;
  isValidUser: boolean;
  inLogin: boolean;

  @ViewChild(LoginComponent) loginchild;

  constructor(
    private admUsersService: AdmUsersService
    , private authService: AuthService) {
    this.validToken = false;
    this.admUser = new AdmUser();
    this.isValidUser = false;
    this.navLinks = [
      { path: "cc/companylist", label: "CCard Companies", active: true }
      , { path: "clients/list", label: "Clients", active: true}
      , { path: "clients/accounts", label: "Accounts", active: true }
    ];
    admUsersService.admUserSubject.subscribe( admUser => {
      this.isValidUser = (admUser && admUser.token) ? true : false;
      this.admUser.set( admUser);
      this.authService.setValidUser(this.isValidUser );
      console.log(this.isValidUser);
    })
  }

  ngAfterViewInit() {
    this.inLogin = this.loginchild.inLogin;
    console.log(this.inLogin);
  }

  logout() {
    this.admUsersService.logout(this.admUser);
  }

}
