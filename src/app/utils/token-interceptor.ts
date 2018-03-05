import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  //skipIntercept: Boolean;

  constructor(public auth: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(request.url);
    if (request.url.indexOf('admin/users/login') == -1) {
      //request = request.clone({ headers: request.headers.set( 'Token' ,this.auth.getToken()) });
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getToken()}`
        }
      });
      //request.withCredentials = true;
    }
    return next.handle(request);
    //  .do(event => {
    //  //console.log( event);
    //  if (event instanceof HttpResponse) {
    //    console.log(event.headers.keys());
    //  }
    //});
    //  });
  }
}
