import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './adm/login.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { PersonsListComponent  } from './clients/persons/clients-list.component';


export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: "/login",
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'clientlist', component: PersonsListComponent },
//  { path: 'clients', loadChildren: './clients/clients.module#ClientsModule' },
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
