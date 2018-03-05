export class ClientAddress {
  address_id: number;
  client_id: number;
  address_type: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  valid_from: Date;
  valid_to: Date;
  recorded_on: Date;

  constructor() {
    console.log( 'client_address');
  }

  set(newClientAddress:ClientAddress) {
    for( let ii in newClientAddress) {
      this[ii] = newClientAddress[ii];
    }
  }
}
