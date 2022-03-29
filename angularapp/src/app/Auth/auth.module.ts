import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { LoginComponent } from './Login/login.component';
import { SignUpComponent } from './SignUp/signup.component';
import { SharedComponentsModule } from '../sharedComponents/sharedComponents.module';

@NgModule({
  declarations: [LoginComponent, SignUpComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedComponentsModule,
  ],
})
export class AuthModule {}
