import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isAuth: boolean = false;
  authObservable = new Subject<boolean>();

  get isAuth() {
    return this._isAuth;
  }
  set isAuth(val: boolean) {
    this._isAuth = val;
    this.authObservable.next(this._isAuth);
  }
}
