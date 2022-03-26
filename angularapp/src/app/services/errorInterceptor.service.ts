import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private errorService: ErrorService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .pipe(catchError((err, caught) => this.errorHandler(err, caught)));
  }

  private errorHandler(
    err: HttpErrorResponse,
    caught: Observable<HttpEvent<any>>
  ) {
    if (err.error instanceof ErrorEvent) {
      this.errorService.error = err.error.message;
      return throwError(`Error: ${err.error.message}`);
    } else if (
      err.status.toString().startsWith('4') ||
      err.status.toString().startsWith('5')
    ) {
      this.errorService.error = err.message;
      return throwError(`Error: ${err.message}`);
    }

    return of(
      new HttpResponse({
        body: err.error.text,
        ...err,
      })
    );
  }
}
