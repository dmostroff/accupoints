/**
 * Created by DANO on 2/21/2018.
 */
export class Config {
  public static APIURL = 'http://ccapi.com';
  public static GetUrl( apipath) {
    return Config.APIURL + '/' + apipath;
  }
}
