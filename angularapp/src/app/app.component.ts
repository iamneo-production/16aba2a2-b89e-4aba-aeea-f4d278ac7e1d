import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angularapp';
  routes = ['login', 'signup'];
  authUpdates = this.authService.authObservable.subscribe({
    next: (data) => {
      if (data) {
        this.router.navigate(['home']);
        this.routes = ['logout'];
      } else {
        this.router.navigate(['/login']);
      }
    },
  });
  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.apiService.autoLogin();
  }

  ngOnDestroy(): void {
    this.authUpdates.unsubscribe();
  }
}
