import { Component, OnInit, Input } from '@angular/core';
import { CcCompany } from './cc-company';
@Component({
  selector: 'cc-company',
  templateUrl: './cc-company.component.html',
  styleUrls: ['./cc-company.component.css']
})
export class CcCompanyComponent implements OnInit {
  @Input('ccCompany') ccCompany: CcCompany;

  constructor() {
    this.ccCompany = new CcCompany();
  }

  ngOnInit() {
  }

}
