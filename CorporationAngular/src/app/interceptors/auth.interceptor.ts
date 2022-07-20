import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private readonly authService:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler)
  : Observable<HttpEvent<unknown>> {  

    
    const copy = request.clone({withCredentials:true});

    return next.handle(copy);
  }
}
