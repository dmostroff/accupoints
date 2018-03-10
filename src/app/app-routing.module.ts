import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './adm/login.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ClientsListComponent  } from './clients/persons/clients-list.component';
import { ClientsModule } from './clients/clients.module';
import { CcCompanyListComponent } from './cc/cc-company-list.component';
import { ClientAccountListComponent } from './clients/accounts/client-account-list.component';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: "/login",
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  { path: 'aboutus', component: AboutusComponent },
//  { path: 'clients/list', component: ClientsListComponent, outlet: 'person'},
  { path: 'clients'
    , children: [
      { path: 'list', component: ClientsListComponent }
      , { path: 'accounts', component: ClientAccountListComponent }
    ]},
  //    //{ path: 'persons', component: ClientsListComponent, children: [
  //    //  { path: ':client_id', component: PersonsComponent, outlet: "person" },
  //    //  //{ path: ':client_id/address/:address_id', component: ClientAddressComponent }
  //    //]
  //    //},
  //  ]},
  { path: 'cc'
    , children: [
    { path: 'companylist', component: CcCompanyListComponent }
  ]},
  { path: 'cc', loadChildren: './cc/cc.module#CcModule' },
  { path: '**', redirectTo: 'pageNotFound', pathMatch: 'full' }
  //, { path: '/', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule
    , RouterModule.forRoot(appRoutes
      , { enableTracing: false }
    )
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {
  constructor() {
    console.log( 'AppRoutingModule');
  }
}
