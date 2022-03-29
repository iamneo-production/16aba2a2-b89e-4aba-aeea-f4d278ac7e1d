import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isAuth: boolean = false;
  authObservable = new Subject<boolean>();
  signUpObservable = new Subject<boolean>();

  get isAuth() {
    return this._isAuth;
  }
  set isAuth(val: boolean) {
    this._isAuth = val;
    this.authObservable.next(this._isAuth);
  }

  constructor(private jwtService: JwtHelperService, private router: Router) {}

  getRole(): string | null {
    return this.jwtService.decodeToken()['role']?.split('_')[1];
  }

  getEmail(): string | null {
    return this.jwtService.decodeToken()['sub'];
  }

  isTokenExpired(): boolean {
    return this.jwtService.isTokenExpired();
  }

  logout() {
    const role = this.getRole();

    if (role && role.toLowerCase() === 'admin') {
      this.router.navigateByUrl('/admin/login');
    } else {
      this.router.navigateByUrl('/login');
    }

    this.isAuth = false;
    localStorage.clear();
  }
}
