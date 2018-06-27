import { Component, OnInit, Input } from '@angular/core';

import { CcActionsService } from './cc-actions.service'
import { CcActions } from './cc-actions'

@Component({
  selector: 'cc-actions',
  templateUrl: './cc-actions.component.html',
  styleUrls: ['./cc-actions.component.css']
})
export class CcActionsComponent implements OnInit {
  @Input('mycc-action') ccAction:CcActions;

  ccAction: CcActions
  constructor( ccActionsService: CcActionsService) {
    this.ccAction = new CcActions();
  }

  ngOnInit() {
  }

}
