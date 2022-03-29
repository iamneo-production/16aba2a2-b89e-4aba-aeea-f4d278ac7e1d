import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (this.authService.isAuth) {
      const role = this.authService.getRole();

      if (role && role.toLowerCase() === 'admin') {
        return true;
      }

      if (role && role.toLowerCase() === 'user') {
        this.router.navigateByUrl('/');
        return false;
      }
    }

    this.router.navigateByUrl('admin/login');
    return false;
  }
}
