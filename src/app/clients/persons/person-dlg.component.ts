import { Component, Inject} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule  } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { ClientPerson } from './../clientperson';

import { ClientsService } from './../clients.service';

import { PhonefmtPipe } from './../../utils/phonefmt.pipe';
import { SsnfmtPipe } from './../../utils/ssnfmt.pipe';

@Component({
  selector: 'app-person-dlg',
  templateUrl: './person-dlg.component.html',
  styleUrls: ['./person-dlg.component.css']
})

export class PersonDlgComponent {

  clientPersonForm:FormGroup;
  clientPersonFormControl:FormControl;

  clientPerson:ClientPerson;
  title: string;

  constructor(public clientsService:ClientsService,
              private fb:FormBuilder,
              public dialogRef:MatDialogRef<ClientPerson>,
              private phonePipe: PhonefmtPipe,
              private ssnPipe: SsnfmtPipe,
              @Inject(MAT_DIALOG_DATA) public data:any
  ) {
    this.clientPerson = data;
    this.title = this.clientPerson.first_name + ' ' + this.clientPerson.last_name;
    this.createForm();
    this.clientPersonFormControl = new FormControl([Validators.required]);

    this.clientPersonForm.controls['ssn'].setValue(this.ssnPipe.transform(this.clientPersonForm.value['ssn']), {emitEvent: false});
    this.clientPersonForm.controls['ssn'].valueChanges.subscribe(
      (value:string) => {
        this.clientPersonForm.controls['ssn'].setValue(this.ssnPipe.transform(value), {emitEvent: false});
      }
    );

    let phones = [ 'phone', 'phone_2', 'phone_cell', 'phone_fax', 'phone_official'];
    phones.forEach( p => {
      let v = this.phonePipe.transform(this.clientPersonForm.value[p]); // this.accountNumberFormat(value);
      this.clientPersonForm.controls[p].setValue(v, {emitEvent: false});
      this.clientPersonForm.controls[p].valueChanges.subscribe(
        (value:string) => {
          let v = this.phonePipe.transform(value); // this.accountNumberFormat(value);
          this.clientPersonForm.controls[p].setValue(v, {emitEvent: false});
        });
    });

    //this.clientPersonForm.controls['phone'].valueChanges.subscribe(
    //  (value:string) => {
    //    let phone = new PhonefmtPipe();
    //    let v = phone.transform(value); // this.accountNumberFormat(value);
    //    this.clientPersonForm.controls['phone'].setValue(v, {emitEvent: false});
    //  });

  }

  createForm() {
    this.clientPersonForm = this.fb.group({
      client_id: this.clientPerson.client_id
      , last_name: this.clientPerson.last_name
      , first_name: this.clientPerson.first_name
      , middle_name: this.clientPerson.middle_name
      , dob: this.clientPerson.dob
      , gender: this.clientPerson.gender
      , ssn: this.clientPerson.ssn
      , mmn: this.clientPerson.mmn
      , email: this.clientPerson.email
      , pwd: this.clientPerson.pwd
      , phone: this.clientPerson.phone
      , phone_2: this.clientPerson.phone_2
      , phone_cell: this.clientPerson.phone_cell
      , phone_fax: this.clientPerson.phone_fax
      , phone_official: this.clientPerson.phone_official
    });
  }


  //ngOnChanges() {
  //  this.clientPersonForm.setValue({
  //    client_id: this.clientPerson.client_id
  //    , last_name: this.clientPerson.last_name
  //    , first_name: this.clientPerson.first_name
  //    , middle_name: this.clientPerson.middle_name
  //    , dob: this.clientPerson.dob
  //    , gender: this.clientPerson.gender
  //    , ssn: this.clientPerson.ssn
  //    , mmn: this.clientPerson.mmn
  //    , email: this.clientPerson.email
  //    , pwd: this.clientPerson.pwd
  //    , phone: this.clientPerson.phone
  //    , phone_2: this.clientPerson.phone_2
  //    , phone_cell: this.clientPerson.phone_cell
  //    , phone_fax: this.clientPerson.phone_fax
  //    , phone_official: this.clientPerson.phone_official
  //  });
  //}

  onSubmit() {
    console.log( this.clientPersonForm.value);
    this.clientsService.postClient(this.clientPersonForm.value);
    this.dialogRef.close();
  }

  onClickCancel() {
    this.dialogRef.close();
  }
}
