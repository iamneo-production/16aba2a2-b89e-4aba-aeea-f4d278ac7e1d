import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './Auth/auth.module';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './services/errorInterceptor.service';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from './sharedComponents/sharedComponents.module';
import { AdminModule } from './Admin/admin.module';
import { UserModule } from './User/user.module';
import { ErrorService } from './services/error.service';

export const tokenGetter = () => {
  return localStorage.getItem('token');
};

export const BASEURL = 'http://localhost:8080/';

@NgModule({
  declarations: [AppComponent],
  imports: [
    SharedComponentsModule,
    CommonModule,
    AdminModule,
    UserModule,
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
      deps: [ErrorService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
