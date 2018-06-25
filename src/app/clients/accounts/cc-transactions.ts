export class CcTransactions {
  cctrans_id:number;
  account_id:number;
  transaction_date:Date;
  transaction_type:string;
  transaction_status:string;
  cedit:string;
  debit:string;
  recorded_on:Date;

  constructor() {
    console.log('ccTransactions -class');
  }

  set(newccTransactions:CcTransactions) {
    for (let ii in newccTransactions) {
      this[ii] = newccTransactions[ii];
    }
  }
}
