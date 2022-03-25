import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { confirmPasswordValidator } from 'src/app/shared/CustomValidators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignUpComponent {
  data = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      username: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('[1-9]{1}[0-9]{9}')],
      ],
    },
    {
      validators: confirmPasswordValidator,
    }
  );

  authUpdates = this.authService.authObservable.subscribe({
    next: (data) => {
      if (!data) return;
      this.router.navigateByUrl('/');
    },
  });

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit() {
    this.apiService.signUp(this.data.value);
  }
}
