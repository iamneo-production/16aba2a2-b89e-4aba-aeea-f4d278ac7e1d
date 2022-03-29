import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './Admin/AdminHome/adminHome.component';
import { AdminMusicComponent } from './Admin/AdminMusic/adminMusic.component';
import { LoginComponent } from './Auth/Login/login.component';
import { SignUpComponent } from './Auth/SignUp/signup.component';
import { AuthGuard } from './guards/AuthGuard';
import { HomeComponent } from './User/Home/home.component';
import { AdminGuard } from './guards/AdminGuard';
import { MusicComponent } from './User/Music/music.component';
import { AdminAddMusicComponent } from './Admin/AdminAddMusic/adminAddMusic.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        matcher: (url) => {
          if (url.length > 1) {
            return null;
          }

          const path = url[0]?.path.toLowerCase();

          if (!path || path === '' || path === 'home') {
            return {
              consumed: url,
            };
          }
        },
        component: HomeComponent,
      },
      {
        path: 'music',
        component: MusicComponent,
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        component: AdminHomeComponent,
      },
      {
        path: 'music',
        component: AdminMusicComponent,
      },
      {
        path: 'addMusic',
        component: AdminAddMusicComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
