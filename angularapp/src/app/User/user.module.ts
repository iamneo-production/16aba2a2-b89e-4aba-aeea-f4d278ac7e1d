import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedComponentsModule } from '../sharedComponents/sharedComponents.module';
import { HomeComponent } from './Home/home.component';
import { MusicComponent } from './Music/music.component';

@NgModule({
  declarations: [HomeComponent, MusicComponent],
  imports: [SharedComponentsModule, BrowserModule, ReactiveFormsModule],
})
export class UserModule {}
