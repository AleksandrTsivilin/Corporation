import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleSelectorGuard implements CanActivate {

  constructor (private readonly authService:AuthService,
    private readonly router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {        
    if (this.authService.token$.value===null) {
      this.router.navigate(["loginForm"]);
      return false;
    }
    return true;
  }
  
}
