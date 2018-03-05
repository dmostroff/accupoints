import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule} from './../utils/app-material.module';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { TokenInterceptor } from '../utils/token-interceptor';

import { ClientsService } from './clients.service';
import { ClientAccountsService } from './client-accounts.service';

import { ClientsRoutingModule } from './clients-routing.module';
import { PersonsListComponent } from './persons/clients-list.component';
import { PersonsComponent } from './persons/persons.component';
import { PersonDlgComponent } from './persons/person-dlg.component';
import { ClientAddressDlgComponent } from './persons/client-address-dlg.component';
import { ClientAddressComponent } from './persons/client-address.component';

@NgModule({
  imports: [
    CommonModule
    , AppMaterialModule
    , ClientsRoutingModule
  ],
  declarations: [PersonsListComponent, PersonsComponent, PersonDlgComponent, ClientAddressDlgComponent, ClientAddressComponent],
  providers: [ ClientsService, ClientAccountsService
    , {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    } ]
})
export class ClientsModule { }
