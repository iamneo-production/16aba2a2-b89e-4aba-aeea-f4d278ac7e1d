import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';

interface Route {
  path: string;
  url: string;
}

const ADMIN_ROUTES: Route[] = [
  {
    path: 'home',
    url: '/admin',
  },
  {
    path: 'music',
    url: '/admin/music',
  },
  {
    path: 'logout',
    url: '',
  },
];
const USER_ROUTES = [
  {
    path: 'home',
    url: '/',
  },
  {
    path: 'music',
    url: '/music',
  },
  {
    path: 'logout',
    url: '',
  },
];
const DEFAULT_ROUTES = [
  {
    path: 'login',
    url: '/login',
  },
  {
    path: 'signup',
    url: '/signup',
  },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angularapp';
  routes = DEFAULT_ROUTES;
  authUpdates = this.authService.authObservable.subscribe({
    next: (data) => {
      if (data) {
        const role = this.authService.getRole()?.toLowerCase();

        if (role == 'admin') this.routes = ADMIN_ROUTES;
        else this.routes = USER_ROUTES;
      } else {
        this.routes = DEFAULT_ROUTES;
        this.router.navigate(['/login']);
      }
    },
  });
  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  logout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.apiService.autoLogin();
  }

  ngOnDestroy(): void {
    this.authUpdates.unsubscribe();
  }
}
