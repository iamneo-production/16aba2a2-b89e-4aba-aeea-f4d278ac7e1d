import { Injectable } from '@angular/core';
import { ILogin } from '../shared/ILogin';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';
import { ISignUp } from '../shared/ISignUp';
import { retry } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { IMusic } from '../shared/IMusic';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = 'http://localhost:8080/';
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

  signUp(data: ISignUp) {
    return this.httpClient.post(`${this.baseUrl}signup`, data).subscribe({
      next: (data) => {
        localStorage.setItem('token', data as string);
        this.authService.isAuth = true;
      },
    });
  }

  getAllMusic() {
    return this.httpClient
      .get<IMusic[]>(`${this.baseUrl}music`)
      .pipe(retry(1))
      .subscribe({
        next: (data) => {
          console.log(data);
        },
      });
  }

  getMusic(id: string) {
    return this.httpClient
      .get<IMusic>(`${this.baseUrl}music/${id}`)
      .subscribe();
  }
}
