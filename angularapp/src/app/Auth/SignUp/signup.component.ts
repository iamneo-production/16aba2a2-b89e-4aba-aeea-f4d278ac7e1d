import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { confirmPasswordValidator } from 'src/app/shared/CustomValidators';
import { PHONE_NUMBER } from 'src/app/shared/regexPattern';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignUpComponent implements OnDestroy {
  data = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      username: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern(PHONE_NUMBER)],
      ],
    },
    {
      validators: confirmPasswordValidator,
    }
  );

  signupUpdates = this.authService.signUpObservable.subscribe({
    next: (data) => {
      if (!data) return;
      this.router.navigateByUrl('/login');
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

  ngOnDestroy(): void {
    this.signupUpdates.unsubscribe();
  }
}
