import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppMaterialModule} from './utils/app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { ClientsModule } from './clients/clients.module';

import { AccNumberMaskPipe } from './utils/acc-number-mask.pipe';

import { AppComponent } from './app.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AdmUsersComponent } from './adm/adm-users.component';
import { CcCompanyListComponent } from './cc/cc-company-list.component';
import { CcCompanycardsComponent } from './cc/cc-companycards.component';
import { CcCompanyDlgComponent } from './cc/cc-company-dlg.component';
import { CcCompanyComponent } from './cc/cc-company.component';
import { CardsComponent } from './cc/cards.component';
import { LoginComponent } from './adm/login.component';
import { ZipcodePipe } from './utils/zipcode.pipe';
import { PhonefmtPipe } from './utils/phonefmt.pipe';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

/* services */
import { TokenInterceptor } from './utils/token-interceptor';
import { AuthService } from './utils/auth.service';
import { AdmUsersService } from './adm/adm-users.service';


@NgModule({
  declarations: [
    AppComponent,
    AboutusComponent,
    AdmUsersComponent,
    CcCompanyListComponent,
    CcCompanycardsComponent,
    CcCompanyDlgComponent,
    CcCompanyComponent,
    CardsComponent,
    LoginComponent,
    AccNumberMaskPipe,
    ZipcodePipe,
    PhonefmtPipe,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    HttpModule,
    AppMaterialModule,
    AppRoutingModule,
    ClientsModule
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
