import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './Auth/auth.module';
import { HomeComponent } from './Home/home.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './guards/AuthGuard';
import { MusicComponent } from './Music/music.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './services/errorInterceptor.service';

export const tokenGetter = () => {
  return localStorage.getItem('token');
};

export const BASEURL = 'http://localhost:8080/';

@NgModule({
  declarations: [AppComponent, HomeComponent, MusicComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: [BASEURL],
        disallowedRoutes: [
          `${BASEURL}/login`,
          `${BASEURL}/signup`,
          `${BASEURL}/admin/login`,
          `${BASEURL}/admin/signup`,
        ],
        skipWhenExpired: true,
      },
    }),
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
