import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './Auth/auth.module';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './services/errorInterceptor.service';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './AdminHome/adminHome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const tokenGetter = () => {
  return localStorage.getItem('token');
};

export const BASEURL = 'http://localhost:8080/';

@NgModule({
  declarations: [AppComponent, AdminHomeComponent, AdminHomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: [`${BASEURL.slice(7, -1)}`],
        disallowedRoutes: [
          `${BASEURL}/login`,
          `${BASEURL}/signup`,
          `${BASEURL}/admin/login`,
          `${BASEURL}/admin/signup`,
        ],
        // skipWhenExpired: true,
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
