import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '@services/core/auth.service';
import {PermissionModel, RoleModel} from '@models/core';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanActivateChild {
  private roles: RoleModel[] = [];

  constructor(private authService: AuthService, private router: Router) {
    this.roles = authService.roles;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('Parent', route.data);
    return this.checkRole(route);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('Child', childRoute.data);
    return this.canActivate(childRoute,state);
  }

  private checkRole(route: ActivatedRouteSnapshot): boolean {
    for (const role of route.data.roles) {
      if (this.roles.find(r => r.name?.toLowerCase() === role?.toLowerCase())) {
        return true;
      }
    }

    this.router.navigate(['/common/access-denied']);
    return false;
  }

}
