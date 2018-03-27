import { Component, OnInit, ViewChild } from '@angular/core';

import { CcCompanyService } from './cc-company.service';

import { CcCompany } from './cc-company';
import { CcCards } from './cc-cards';
import { CcCompanyComponent } from './cc-company.component';
import { CcCompanycardsComponent } from './cc-companycards.component';

import { PhonefmtPipe } from './../utils/phonefmt.pipe';

@Component({
  selector: 'cc-company-list',
  templateUrl: './cc-company-list.component.html',
  styleUrls: ['./cc-company-list.component.css'],
  providers: [PhonefmtPipe]
})
export class CcCompanyListComponent implements OnInit {
  ccCompanyList:CcCompany[];

  @ViewChild(CcCompanycardsComponent) ccCards;
  @ViewChild(CcCompanyComponent) ccCompany;

  constructor(private ccCompanyService:CcCompanyService
    , private phonefmt:PhonefmtPipe) {
    this.ccCompanyList = [];
    this.ccCompany = new CcCompany();
    console.log('ccCompanyList');
  }

  ngOnInit() {
    this.ccCompanyService.ccCompanyListSubject.subscribe(companylist => {
      this.ccCompanyList = companylist;
    });
    this.ccCompanyService.ccCompanySubject.subscribe(company => {
      this.ccCompany = company;
      if (company) {
        this.ccCompany.phone = this.phonefmt.transform(this.ccCompany.phone);
        this.ccCompany.phone_2 = this.phonefmt.transform(this.ccCompany.phone_2);
      }
    });
    this.ccCompanyService.getCompanyList();
  }

  getCompanyList() {
    this.ccCompanyService.getCompanyList();
  }

  onClick(id) {
    this.ccCompanyService.ccCompanyId = id;
    console.log(id);
    this.ccCompanyService.getCompany(id);
    //this.ccCompanyService.getCompanyCards(id);
//    this.isEdit = false;
    //this.router.navigate( ['cc', 'company', id]);
  }
}

