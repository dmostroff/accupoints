import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppModule } from './../app.module';
import { AppMaterialModule} from './../utils/app-material.module';
import { UtilModule } from './../utils/util.module';

import { TokenInterceptor } from '../utils/token-interceptor';

import { ClientsService } from './clients.service';
import { ClientAccountService } from './client-account.service';

import { ClientsListComponent } from './persons/clients-list.component';
import { PersonsComponent } from './persons/persons.component';
import { PersonDlgComponent } from './persons/person-dlg.component';
import { ClientAddressDlgComponent } from './persons/client-address-dlg.component';
import { ClientAddressComponent } from './persons/client-address.component';

import { ClientAccountListComponent } from './accounts/client-account-list.component';

var MY_COMPONENTS = [
  ClientsListComponent
  , PersonsComponent
  , PersonDlgComponent
  , ClientAddressDlgComponent
  , ClientAddressComponent
  , ClientAccountListComponent
];

@NgModule({
  imports: [
    CommonModule
    , FormsModule
    , ReactiveFormsModule
    , AppMaterialModule
    , UtilModule
  ],
  declarations: [ MY_COMPONENTS ],
  entryComponents: [PersonDlgComponent],
  providers: [ ClientsService, ClientAccountService]
})
export class ClientsModule { }
