import { Injectable } from '@angular/core';
import { ILogin } from '../shared/ILogin';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';
import { ISignUp } from '../shared/ISignUp';
import { retry } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { IMusic } from '../shared/IMusic';
import { IUser } from '../shared/IUser';

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

  private tokenAdder(data: any) {
    if (!data) return;
    localStorage.setItem('token', data as string);
    this.authService.isAuth = true;
  }

  login(data: ILogin) {
    return this.httpClient.post(`${this.baseUrl}login`, data).subscribe({
      next: this.tokenAdder,
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.authService.isAuth = false;
  }

  signUp(data: ISignUp) {
    return this.httpClient.post(`${this.baseUrl}signup`, data).subscribe({
      next: this.tokenAdder,
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

  updateMusic(musicDetails: IMusic) {
    return this.httpClient
      .put(`${this.baseUrl}admin/music/${musicDetails.id}`, musicDetails)
      .subscribe();
  }

  deleteMusic(id) {
    return this.httpClient
      .delete(`${this.baseUrl}admin/music/${id}`)
      .subscribe();
  }

  getUsers() {
    return this.httpClient.get<IUser[]>(`${this.baseUrl}admin`).subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }

  updateUser(userDetails: IUser) {
    return this.httpClient
      .put(`${this.baseUrl}admin/userEdit/${userDetails.id}`, userDetails)
      .subscribe();
  }

  deleteUser(id) {
    return this.httpClient
      .delete(`${this.baseUrl}admin/delete/${id}`)
      .subscribe();
  }
}
