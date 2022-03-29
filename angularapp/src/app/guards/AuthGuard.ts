import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private jwtService: JwtHelperService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isAuth) {
      const role = this.authService.getRole()?.toLowerCase();

      if (role === 'user') return true;
      if (role === 'admin') {
        this.router.navigateByUrl('admin');
        return false;
      }
    }

    this.router.navigateByUrl('login');
    return false;
  }
}
