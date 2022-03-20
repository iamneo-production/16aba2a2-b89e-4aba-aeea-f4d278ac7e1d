import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ILogin } from 'src/app/shared/ILogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  data = new FormBuilder().group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
  });

  error = null;

  errorUpdates = this.apiService.errorUpdates.subscribe((err) => {
    this.error = err;
  });
  constructor(private apiService: ApiService) {}

  onSubmit() {
    const loginData: ILogin = {
      email: this.data.get('email').value,
      password: this.data.get('password').value,
    };
    this.apiService.login(loginData);
  }
}
