import { Injectable } from '@angular/core';
import { ILogin } from '../shared/ILogin';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';
import { ISignUp } from '../shared/ISignUp';
import { catchError } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = 'http://localhost:8080/';
  private isAuth: boolean = false;
  private _error = null;

  errorUpdates = new Subject();

  set error(val) {
    this._error = val;
    this.errorUpdates.next(this._error);
  }

  get error() {
    return this._error;
  }

  constructor(
    private httpClient: HttpClient,
    private jwtHelper: JwtHelperService,
    private authService: AuthService
  ) {}

  autoLogin() {
    if (!this.jwtHelper.isTokenExpired()) {
      this.authService.isAuth = true;
    }
  }

  login(data: ILogin) {
    return this.httpClient.post(`${this.baseUrl}login`, data).subscribe({
      next: (data) => {
        localStorage.setItem('token', data as string);
        this.authService.isAuth = true;
      },
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.authService.isAuth = false;
  }

  signUp(data: ISignUp) {}

  getAllMusic() {}

  getMusic(id: string) {}
}
