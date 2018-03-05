import { CcCompany } from './cc-company';

export class CcCards {
	cc_card_id: number;
	cc_company_id: number;
	card_name: string;
	version: string;
	annual_fee: number;
	first_year_free: number;
  recorded_on: Date;

	constructor() {
		console.log( 'CcCards');
	}

	set(newCcCards:CcCards) {
		for( let ii in newCcCards) {
			this[ii] = newCcCards[ii];
		}
	}
}

export class CcCardsExt {
  ccCard: CcCards;
  cc_company_name: string;
  ccCompanyList: CcCompany[];

  constructor() {
    console.log( 'CcCardsExt');
  }
}
