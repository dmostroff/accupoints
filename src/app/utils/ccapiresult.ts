export interface ICcaApiResultCode {
  rc: Number
  , msg: string
}

export interface ICcapiResult {
  res: ICcaApiResultCode
  , data: any
}

export class CcapiResult implements ICcapiResult {
  res: {
    rc: Number;
    msg: string;
  };
  data: any;

  constructor () {}
}
