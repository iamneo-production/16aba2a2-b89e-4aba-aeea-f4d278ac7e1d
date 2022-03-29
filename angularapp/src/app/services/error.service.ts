import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private _error = null;
  errorUpdates = new Subject<string>();

  set error(val) {
    this._error = val;
    this.errorUpdates.next(this._error);
    this.clearError();
  }

  get error() {
    return this._error;
  }

  private clearError() {
    setTimeout(() => {
      this.error = null;
    }, 4000);
  }
}
