import { Component, OnInit } from '@angular/core';

import { CcActionsService } from './cc-actions.service'
import { CcActions } from './cc-actions'

@Component({
  selector: 'app-cc-actions',
  templateUrl: './cc-actions.component.html',
  styleUrls: ['./cc-actions.component.css']
})
export class CcActionsComponent implements OnInit {

  ccAction: CcActions
  constructor( ccActionsService: CcActionsService) {
    this.ccAction = new CcActions();
  }

  ngOnInit() {
  }

}
