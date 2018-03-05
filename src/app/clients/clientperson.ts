export class ClientPerson {
  client_id: number;
  last_name: string;
  first_name: string;
  middle_name: string;
  dob: string;
  gender: string;
  ssn: string;
  mmn: string;
  email: string;
  pwd: string;
  phone: string;
  phone_2: string;
  phone_cell: string;
  phone_fax: string;
  phone_official: string;
  recorded_on: string;

  constructor() {
    console.log( 'ClientPerson');
  }

  set(newClientPerson:ClientPerson) {
    for( let ii in newClientPerson) {
      this[ii] = newClientPerson[ii];
    }
  }
}
