import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Routers } from '../enums/routers/routers';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class EditProductGuard implements CanActivate {

  constructor(
    private readonly authService:AuthService,
    private readonly router:Router,
    private readonly notify:NotificationService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const isHasPermission = this.authService.isHasPermission("Update","ProductManager");
    if (isHasPermission) return true;
    this.notify.error("Route is not avaiable","Guard")
    this.router.navigate([Routers.TABLE])
    return false;
  }
  
}
