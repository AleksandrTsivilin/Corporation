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
    
    
    const userId=1;
    const isGetMethod=request.method.includes("GET");
    const isContainByAccess=request.url.includes("ByAccess");
    const isContainByUser=request.url.includes("ByUser")
    
    if (!isGetMethod)
      return next.handle(request);

    if (!isContainByAccess && !isContainByUser)
      return next.handle(request);
      
    if (isContainByAccess){
      console.log("get + byAccess");
      const copy= request.clone({
        headers: new HttpHeaders({
          "access":"region"
        })
      })
      return next.handle(copy);
    }
    else {
      console.log("get + byUser")
      const copy=request.clone({
        headers:new HttpHeaders({
          "userId":userId.toString()
        })
      })
      return next.handle(copy);
    }
    
    
    
    
    
  }
}
