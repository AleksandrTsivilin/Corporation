import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ServicesGuard implements CanActivate {

  constructor(private readonly authService:AuthService,
    private readonly router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {  
            
    if (this.authService.tokenData$.value===null) {
      this.router.navigate(["loginForm"]);
      return false;
    }
    return true;
  }
  
}
