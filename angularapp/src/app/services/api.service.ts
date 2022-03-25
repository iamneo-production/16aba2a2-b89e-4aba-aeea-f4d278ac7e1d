import { Injectable } from '@angular/core';
import { ILogin } from '../shared/ILogin';
import { HttpClient } from '@angular/common/http';
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
  private _music: IMusic[] = null;
  private _users: IUser[] = null;

  errorUpdates = new Subject();
  musicUpdates = new Subject<IMusic[]>();
  usersUpdates = new Subject<IUser[]>();

  set music(val) {
    this._music = val;
    this.musicUpdates.next(this._music);
  }

  get music() {
    return this._music;
  }

  set error(val) {
    this._error = val;
    this.errorUpdates.next(this._error);
  }

  get error() {
    return this._error;
  }

  set users(val) {
    this._users = val;
    this.usersUpdates.next(this._users);
  }

  get users() {
    return this._users;
  }

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  autoLogin() {
    if (!this.authService.isTokenExpired()) {
      this.authService.isAuth = true;
      return;
    }

    localStorage.clear();
  }

  private tokenAdder = (data: any) => {
    if (!data) return;
    localStorage.setItem('token', data as string);
    this.authService.isAuth = true;
  };

  adminLogin(data: ILogin) {
    return this.httpClient.post(`${this.baseUrl}admin/login`, data).subscribe({
      next: this.tokenAdder,
    });
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
          this.music = data;
        },
      });
  }

  getMusic(id: string) {
    return this.httpClient
      .get<IMusic>(`${this.baseUrl}music/${id}`)
      .subscribe();
  }
  addMusic(musicDetails: IMusic) {
    return this.httpClient
      .post(`${this.baseUrl}admin/addMusic`, musicDetails)
      .subscribe({
        complete: () => this.getAllMusic(),
      });
  }
  updateMusic(musicDetails: IMusic) {
    const data = {};
    for (let k in musicDetails) {
      if (musicDetails[k] && musicDetails[k].length > 0) {
        data[k] = musicDetails[k];
      }
    }
    return this.httpClient
      .put(`${this.baseUrl}admin/music/${musicDetails.musicId}`, data)
      .subscribe({
        complete: () => this.getAllMusic(),
      });
  }

  deleteMusic(id) {
    return this.httpClient
      .delete(`${this.baseUrl}admin/music/${id}`)
      .subscribe({
        complete: () => this.getAllMusic(),
      });
  }

  getUsers() {
    return this.httpClient.get<IUser[]>(`${this.baseUrl}admin`).subscribe({
      next: (data) => {
        this.users = data;
      },
    });
  }

  updateUser(userDetails: IUser) {
    const data = {};
    for (let k in userDetails) {
      if (userDetails[k] && userDetails[k].length > 0) {
        data[k] = userDetails[k];
      }
    }
    return this.httpClient
      .put(`${this.baseUrl}admin/userEdit/${userDetails.id}`, data)
      .subscribe({
        complete: () => this.getUsers(),
      });
  }

  deleteUser(id) {
    return this.httpClient
      .delete(`${this.baseUrl}admin/delete/${id}`)
      .subscribe({
        complete: () => this.getUsers(),
      });
  }
}
