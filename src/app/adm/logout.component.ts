import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormArray, FormBuilder} from '@angular/forms';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { AdmUsersService } from './adm-users.service';
import { AdmUser } from './adm-users';
import { AuthService } from '../utils/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LogoutComponent implements OnInit {


  constructor( private admUsersService:AdmUsersService
    , private authService:AuthService
    , private router:Router) {
  }

  ngOnInit() {
    //this.admUsersService.inLogin(true);
    //console.log( ['ngOnInit', this.admUsersService.inLogin ]);
    this.router.navigate(['/login']);
  }

}
