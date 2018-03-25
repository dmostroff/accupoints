export class AdmTags {
  prefix: string;
  tag: string;
  description: string;

  constructor( ) {
    console.log( 'AdmTags');
  }

  public set(newAdmTag:AdmTags) {
    for( let ii in newAdmTag) {
      this[ii] = newAdmTag[ii];
    }
  }

  public getByPrefix( admTags: AdmTags[], prefix: string) {
    let retVal = [];
    admTags.forEach( tag => {
      if( tag.prefix == prefix) {
        retVal.push( {tag: tag.tag, description: tag.description});
      }
    })
    return retVal;
  }
}
