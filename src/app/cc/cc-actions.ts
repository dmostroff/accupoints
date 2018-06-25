export class CcActions {
  ccaction_id: number;
  account_id: number;
  ccaction: string;
  action_type: string;
  action_status: string;
  due_date: Date;
  details: string;
  recorded_on: string

  constructor() {
    console.log( 'CcActions -class');
  }

  set(newCc_action:CcActions) {
    for( let ii in newCc_action) {
      this[ii] = newCc_action[ii];
    }
  }}


