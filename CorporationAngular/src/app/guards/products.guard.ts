import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Routers } from '../enums/routers/routers';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsGuard implements CanActivate, CanActivateChild{
   
  constructor(
    private readonly authService:AuthService,
    private readonly roter:Router,
    private readonly notify:NotificationService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isValidRole = this.isValidRole();
    if ( isValidRole) return true;
    this.handleErrorRoute();   
    
    return false;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const isValidRole = this.isValidRole();
      if (isValidRole) return true;

      this.handleErrorRoute();
      return false;
  }

  private isValidRole() :boolean{
    return this.authService.isHasRole("ProductManager");
  }

  private handleErrorRoute(){
    this.notify.error("Router is not avaiable","Guard")
    this.roter.navigate([Routers.SERVICES])
  }
  
}
