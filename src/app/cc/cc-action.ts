export class CcAction {
	ccaction_id: number;
	clicc_id: number;
	ccaction: string;
	action_type: string;
	action_status: string;
	due_date: Date;
	details: string;
	recorded_on: Date;

	constructor() {
		console.log( 'CcAction -class');
	}

	set(newCc_action:CcAction) {
		for( let ii in newCc_action) {
			this[ii] = newCc_action[ii];
		}
	}}
