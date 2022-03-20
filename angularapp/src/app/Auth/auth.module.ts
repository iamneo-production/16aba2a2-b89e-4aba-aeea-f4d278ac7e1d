import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { LoginComponent } from './Login/login.component';
import { SignUpComponent } from './SignUp/signup.component';

@NgModule({
  declarations: [LoginComponent, SignUpComponent],
  imports: [BrowserModule, ReactiveFormsModule, AppRoutingModule],
  exports: [LoginComponent, SignUpComponent],
})
export class AuthModule {}
