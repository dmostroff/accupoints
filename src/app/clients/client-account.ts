export class ClientAccount {
  account_id: number;
  client_id: number;
  cc_card_id: number;
  name: string;
  account: string;
  account_num: string;
  account_info: string;
  account_date: Date;
  cc_login: string;
  cc_password: string;
  cc_status: string;
  annual_fee: number;
  credit_limit: number;
  addtional_card: number;
  recorded_on: Date;

  constructor() {
    console.log( ClientAccount);
  }

  set(newClientAccount:ClientAccount) {
    for( let ii in newClientAccount) {
      this[ii] = newClientAccount[ii];
    }
  }}
