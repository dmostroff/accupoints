import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PersonsListComponent }    from './persons/clients-list.component';
import { PersonsComponent }    from './persons/persons.component';
//import { ClientAddressComponent }    from './persons/client-address.component';

//import { ClientAccountListComponent } from './accounts/client-account-list.component';
//import { ClientAccountComponent }    from './accounts/client-account.component';
//import { ClientAccountPersonComponent }    from './accounts/client-account-person.component';

const routes: Routes = [
  { path: 'list', component: PersonsListComponent},
  { path: 'persons', component: PersonsListComponent, children: [
    { path: ':client_id', component: PersonsComponent, outlet: "person" },
    //{ path: ':client_id/address/:address_id', component: ClientAddressComponent }
  ] },
  { path: 'person/:client_id', component: PersonsComponent },
  //{ path: 'accounts', component: ClientAccountListComponent },
  //{ path: 'accounts/person/:client_id', component: ClientAccountPersonComponent },
  //{ path: 'account/:account_id', component: ClientAccountComponent }
  //, { path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})

export class ClientsRoutingModule {
  constructor() {
    console.log('ClientsRoutingModule');
  }
}
