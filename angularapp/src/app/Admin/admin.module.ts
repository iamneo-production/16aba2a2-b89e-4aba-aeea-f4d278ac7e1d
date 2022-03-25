import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedComponentsModule } from '../sharedComponents/sharedComponents.module';
import { AdminAddMusicComponent } from './AdminAddMusic/adminAddMusic.component';
import { AdminHomeComponent } from './AdminHome/adminHome.component';
import { AdminMusicComponent } from './AdminMusic/adminMusic.component';

@NgModule({
  declarations: [
    AdminHomeComponent,
    AdminAddMusicComponent,
    AdminMusicComponent,
  ],
  imports: [ReactiveFormsModule, BrowserModule, SharedComponentsModule],
})
export class AdminModule {}
