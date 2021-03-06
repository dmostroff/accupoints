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
import { LogoutComponent } from './adm/logout.component';


import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

/* services */
import { TokenInterceptor } from './utils/token-interceptor';
import { AuthService } from './utils/auth.service';
import { AdmUsersService } from './adm/adm-users.service';
import { AdmTagsService } from './adm/adm-tags.service';
import { UtilsService } from './utils/utils.service';
import { CcActionsListComponent } from './cc/cc-actions-list.component';

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
  LogoutComponent,
  PageNotFoundComponent,
];

@NgModule({
  declarations: [
    MY_COMPONENTS,
    CcActionsListComponent,
  ],
  imports: [
    MY_MODULES
  ],
  exports: [
    AppMaterialModule
    , UtilModule
  ],
  providers: [AuthService, AdmUsersService, UtilsService, AdmTagsService,
    ,{
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
