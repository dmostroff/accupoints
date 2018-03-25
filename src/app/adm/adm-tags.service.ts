import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import { AdmTags } from './adm-tags';
import { Config } from './../utils/config';
import {CcapiResult} from './../utils/ccapiresult';
import { AuthService } from './../utils/auth.service';

@Injectable()
export class AdmTagsService {

  public admTagsSubject:BehaviorSubject<AdmTags[]> = new BehaviorSubject<AdmTags[]>([]);
  public admTagSubject:BehaviorSubject<AdmTags> = new BehaviorSubject<AdmTags>(null);
  public admTags:AdmTags[];
  public admTag:AdmTags;
  private apiUrl: string;

  constructor( private http:HttpClient
    , private authService: AuthService) {
    this.apiUrl = 'admin/tags';

  }

  public getTags(prefix) {
    let url = Config.GetUrl(this.apiUrl+'/'+prefix);
    console.log(url);
    return this.http.get<CcapiResult>(url
      , {headers: new HttpHeaders().set('Authorization', this.authService.token)}
      )
      .subscribe(resp => {
          console.log(resp);
          if (0 == resp.res.rc && resp.data) {
            this.admTags = resp.data;
            this.admTagsSubject.next(this.admTags);
          }
        }
        , err => {
          this.admTagsSubject.next(null);
          console.log(err);
        }
      );

  }

}
