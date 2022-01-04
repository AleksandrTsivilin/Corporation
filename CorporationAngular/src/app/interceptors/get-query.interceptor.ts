import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GetQueryInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler)
    : Observable<HttpEvent<unknown>> {
    
    const isGetMethod=request.method.includes("GET");
    const isContainByAccess=request.url.includes("ByAccess");
    console.log(isContainByAccess);
    if (!isGetMethod || !isContainByAccess)
      return next.handle(request);
    
    
    console.log("includes get")
    const copy= request.clone({
      headers: new HttpHeaders({
        "access":"department"
      })
    })
    return next.handle(copy);
    
    
  }
}
