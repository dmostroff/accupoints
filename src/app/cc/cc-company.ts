export class CcCompany {

	cc_company_id: number;
	cc_name: string;
	url: string;
	contact: string;
	address_1: string;
	address_2: string;
	city: string;
	state: string;
	zip: string;
	country: string;
	phone: string;
	phone_2: string;
	phone_cell: string;
	phone_fax: string;
  recorded_on: Date;

	constructor() {
		console.log( CcCompany);
	}

	set(newCcCompany:CcCompany) {
    if( newCcCompany) {
      for( let ii in newCcCompany) {
        this[ii] = newCcCompany[ii];
      }
    }
	}
}
