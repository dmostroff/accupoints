import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule} from './../utils/app-material.module';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { TokenInterceptor } from '../utils/token-interceptor';

import { ClientsService } from './clients.service';
import { ClientAccountService } from './client-account.service';

import { ClientsListComponent } from './persons/clients-list.component';
import { PersonsComponent } from './persons/persons.component';
import { PersonDlgComponent } from './persons/person-dlg.component';
import { ClientAddressDlgComponent } from './persons/client-address-dlg.component';
import { ClientAddressComponent } from './persons/client-address.component';

import { ClientAccountListComponent } from './accounts/client-account-list.component';


@NgModule({
  imports: [
    CommonModule
    , AppMaterialModule
  ],
  declarations: [ClientsListComponent, PersonsComponent, PersonDlgComponent, ClientAddressDlgComponent, ClientAddressComponent, ClientAccountListComponent ],
  providers: [ ClientsService, ClientAccountService]
})
export class ClientsModule { }
