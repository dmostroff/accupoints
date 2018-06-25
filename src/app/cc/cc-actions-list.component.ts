import { Component, OnInit, ViewChild } from '@angular/core';

import { CcActionsService } from './cc-actions.service';

import { CcActions } from './cc-actions'
import { CcActionsComponent } from './cc-actions.component'

@Component({
  selector: 'app-cc-actions-list',
  templateUrl: './cc-actions-list.component.html',
  styleUrls: ['./cc-actions-list.component.css']
})
export class CcActionsListComponent implements OnInit {
  ccActionsList:CcActions[];

  @ViewChild(CcActionsComponent) ccAction;

  constructor(private ccActionsService:CcActionsService) {
    this.ccActionsList = [];
    this.ccAction = new CcActions();
    console.log('ccActionList');
  }

  ngOnInit() {
    this.ccActionsService.ccActionsListSubject.subscribe(actionslist => {
      this.ccActionsList = actionslist;
    });
    this.ccActionsService.ccActionsSubject.subscribe(ccaction => {
      this.ccAction = ccaction;
    });
    this.ccActionsService.getCcActionsList();
  }

  onClick(id) {
    this.ccActionsService.getCcActions(id);
  }

}
