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
  private _music: IMusic[] = null;
  private _users: IUser[] = null;
  private _userMusic: IMusic[] = null;

  musicUpdates = new Subject<IMusic[]>();
  usersUpdates = new Subject<IUser[]>();
  userMusicUpdates = new Subject<IMusic[]>();

  set userMusic(val) {
    this._userMusic = val;
    this.userMusicUpdates.next(this._userMusic);
  }

  get userMusic() {
    return this._userMusic;
  }

  set music(val) {
    this._music = val;
    this.musicUpdates.next(this._music);
  }

  get music() {
    return this._music;
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

  // Find all music as well as the the  music liked by user
  getAllMusic() {
    return this.httpClient
      .get<IMusic[]>(`${this.baseUrl}music`)
      .pipe(retry(1))
      .subscribe({
        next: (data) => {
          this.music = data;
          const email = this.authService.getEmail();
          this.userMusic = data.filter((m) => {
            const exists =
              m.like.likedUser.findIndex((u) => u.email === email) > -1;

            if (exists) return true;
            return false;
          });
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

  deleteMusic(id: string) {
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

  deleteUser(id: string) {
    return this.httpClient
      .delete(`${this.baseUrl}admin/delete/${id}`)
      .subscribe({
        complete: () => this.getUsers(),
      });
  }

  addLike(id: string) {
    const alreadyLiked = this.userMusic.findIndex((m) => m.musicId === id) > -1;

    if (alreadyLiked) return;

    return this.httpClient.post(`${this.baseUrl}like/${id}`, {}).subscribe({
      complete: () => this.getAllMusic(),
    });
  }

  removeLike(id: string) {
    const alreadyDisLiked =
      this.userMusic.findIndex((m) => m.musicId === id) === -1;

    if (alreadyDisLiked) return;
    return this.httpClient.delete(`${this.baseUrl}like/${id}`).subscribe({
      complete: () => this.getAllMusic(),
    });
  }
}
