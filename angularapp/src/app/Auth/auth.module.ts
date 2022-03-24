import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { AdminLoginComponent } from './AdminLogin/AdminLogin.component';
import { AdminMusicComponent } from '../AdminMusic/adminMusic.component';
import { LoginComponent } from './Login/login.component';
import { SignUpComponent } from './SignUp/signup.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    AdminLoginComponent,
    AdminMusicComponent,
  ],
  imports: [BrowserModule, ReactiveFormsModule, AppRoutingModule],
  exports: [
    LoginComponent,
    SignUpComponent,
    AdminLoginComponent,
    AdminMusicComponent,
  ],
})
export class AuthModule {}
