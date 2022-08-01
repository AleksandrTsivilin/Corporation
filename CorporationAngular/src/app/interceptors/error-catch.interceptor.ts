import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { state } from '@angular/animations';

@Injectable()
export class ErrorCatchInterceptor implements HttpInterceptor {

  constructor(
    private readonly authService:AuthService,
    private readonly router:Router
    ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (!this.authService.tokenData$.value)
      return next.handle(request);
    
    return next.handle(request)
      .pipe(
        map(res => {
            console.log("Passed through the interceptor in response");
            return res
        }),
        catchError((error: HttpErrorResponse) => {
            let errorMsg = '';

            if (error.error instanceof ErrorEvent) {
              
            }
            else{
              console.log("server")
              // errorMsg = `Error Code: ${error.status}`
              const statusCode = error.status;
              this.router.navigate(['/responces'],{state:{code:statusCode}});
            }
            return throwError(errorMsg);
        })
    )
  }
}
