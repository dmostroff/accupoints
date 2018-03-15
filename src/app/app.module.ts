import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppMaterialModule} from './utils/app-material.module';
import { UtilModule} from './utils/util.module';

import { AppRoutingModule } from './app-routing.module';
 import { ClientsModule } from './clients/clients.module';
import { CcModule } from './cc/cc.module';


import { AppComponent } from './app.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AdmUsersComponent } from './adm/adm-users.component';
import { LoginComponent } from './adm/login.component';


import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

/* services */
import { TokenInterceptor } from './utils/token-interceptor';
import { AuthService } from './utils/auth.service';
import { AdmUsersService } from './adm/adm-users.service';

var MY_MODULES = [
  BrowserModule
  , BrowserAnimationsModule
  , FormsModule
  , ReactiveFormsModule
  , FlexLayoutModule
  , HttpClientModule
  , HttpModule
  , AppRoutingModule
  , AppMaterialModule
  , UtilModule
  , ClientsModule
  , CcModule

];

var MY_COMPONENTS = [
  AppComponent,
  AboutusComponent,
  AdmUsersComponent,
  LoginComponent,
  PageNotFoundComponent,
];

@NgModule({
  declarations: [
    MY_COMPONENTS
  ],
  imports: [
    MY_MODULES
  ],
  exports: [
    AppMaterialModule
  ],
  providers: [AuthService, AdmUsersService
    ,{
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
