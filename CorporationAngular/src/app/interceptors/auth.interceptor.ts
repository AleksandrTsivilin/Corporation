import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private readonly authService:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler)
  : Observable<HttpEvent<unknown>> {
    
    const rawToken = this.authService.token$.value;
    const copy = request.clone(
      {
        headers:new HttpHeaders({
          "Authorization":`Bearer ${rawToken}` 
        })
      }
    )
    return next.handle(copy);
  }
}
