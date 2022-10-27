import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Routers } from '../enums/routers/routers';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EditProductGuard implements CanActivate {

  constructor(
    private readonly authService:AuthService,
    private readonly router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const isHasPermission = this.authService.isHasPermission("Update","ProductManager");
    if (!isHasPermission) { this.router.navigate([Routers.TABLE])}
    return isHasPermission;
  }
  
}
