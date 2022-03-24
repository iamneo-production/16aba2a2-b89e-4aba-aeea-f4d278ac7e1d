import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  data = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
  });

  error = null;

  errorUpdates = this.apiService.errorUpdates.subscribe((err) => {
    this.error = err;
  });
  constructor(private apiService: ApiService, private fb: FormBuilder) {}

  onSubmit() {
    this.apiService.login(this.data.value);
  }
}
