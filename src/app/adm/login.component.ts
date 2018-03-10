import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormArray, FormBuilder} from '@angular/forms';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { AdmUsersService } from './adm-users.service';
import { AdmUser } from './adm-users';
import { AuthService } from '../utils/auth.service';

//const PWD_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]{8,}$/;
const PWD_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]{6,}$/;
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
  const isSubmitted = form && form.submitted;
  return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
}
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  loginFormLoginControl:FormControl;
  loginFormPwdControl:FormControl;
  admUser: AdmUser;
  bSuccess: boolean;
  msg: string;
  inLogin: boolean;


  constructor(private fb:FormBuilder
    , private admUsersService: AdmUsersService
    , private authService: AuthService
    , private router: Router ) {
      this.inLogin = true;
      this.bSuccess = false;
      this.admUser = admUsersService.admUser;
      this.loginFormLoginControl = new FormControl(this.admUser.login, [Validators.required]);
      this.loginFormPwdControl = new FormControl(this.admUser.pwd, [Validators.required, Validators.pattern(PWD_REGEX)]);
      this.msg = 'Please Log In';
      this.loginForm = this.fb.group({
        login: this.loginFormLoginControl,
        pwd: this.loginFormPwdControl
      });
  }

  ngOnInit() {
    this.admUsersService.admUserSubject.subscribe(result => {
      console.log(result);
      this.admUser.set(result);
      if (result && result.user_id > 0) {
        this.admUser.set(result);
      } else {
        if (this.admUser.user_name && this.admUser.pwd) {
          this.msg = this.admUser.user_name + ' invalid user / password';
        } else {
          this.msg = 'Please login';
        }
      }
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.msg = 'Submittted';
      console.log('login call');
      this.inLogin = false;
      this.admUsersService.login(this.loginForm.value);
    }
  }
}
