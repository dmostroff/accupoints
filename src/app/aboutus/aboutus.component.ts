import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
copyRightDate: Date;
  constructor() {
   this.copyRightDate = new Date();
  }

  ngOnInit() {
  }

}
