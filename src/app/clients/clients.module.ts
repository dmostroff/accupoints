import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppModule } from './../app.module';
import { AppMaterialModule} from './../utils/app-material.module';
import { UtilModule } from './../utils/util.module';

import { TokenInterceptor } from '../utils/token-interceptor';

import { ClientsService } from './clients.service';
import { ClientAccountService } from './client-account.service';
import { UtilsService } from './../utils/utils.service';

import { ClientsListComponent } from './persons/clients-list.component';
import { PersonsComponent } from './persons/persons.component';
import { PersonDlgComponent } from './persons/person-dlg.component';
import { ClientAddressDlgComponent } from './persons/client-address-dlg.component';
import { ClientAddressComponent } from './persons/client-address.component';

import { ClientAccountListComponent } from './accounts/client-account-list.component';
import { ClientAccountDlgComponent } from './accounts/client-account-dlg.component';
import { PhonefmtPipe } from './../utils/phonefmt.pipe';
import { ClientsContainerComponent } from "./clients-container.component";
import { ClientAccountsContainerComponent } from "./accounts/client-accounts-container.component";
import { ClientAccountComponent } from './accounts/client-account.component';

var MY_COMPONENTS = [
  ClientsContainerComponent
  , ClientsListComponent
  , PersonsComponent
  , PersonDlgComponent
  , ClientAddressDlgComponent
  , ClientAddressComponent
  , ClientAccountsContainerComponent
  , ClientAccountListComponent
  , ClientAccountDlgComponent
  , ClientAccountComponent
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
  entryComponents: [PersonDlgComponent, ClientAccountDlgComponent],
  providers: [ ClientsService, ClientAccountService, PhonefmtPipe ]
})
export class ClientsModule { }
