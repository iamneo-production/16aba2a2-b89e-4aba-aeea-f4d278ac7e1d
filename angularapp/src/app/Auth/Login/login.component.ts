import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  data = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
  });

  authUpdates = this.authService.authObservable.subscribe({
    next: (data) => {
      if (!data) return;

      const role = this.authService.getRole()?.toLowerCase();

      if (role === 'user') this.router.navigateByUrl('/');
      if (role === 'admin') this.router.navigateByUrl('/admin');
    },
  });

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.apiService.login(this.data.value);
  }
}
