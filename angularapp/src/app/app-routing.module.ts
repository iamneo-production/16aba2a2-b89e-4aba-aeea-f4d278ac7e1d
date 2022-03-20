import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Auth/Login/login.component';
import { SignUpComponent } from './Auth/SignUp/signup.component';
import { AuthGuard } from './guards/AuthGuard';
import { HomeComponent } from './Home/home.component';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
