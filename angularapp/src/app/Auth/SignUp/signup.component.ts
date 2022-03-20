import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { confirmPasswordValidator } from 'src/app/shared/CustomValidators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignUpComponent {
  data = new FormBuilder().group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      username: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      mobileNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
    },
    {
      validators: confirmPasswordValidator,
    }
  );

  constructor(private apiService: ApiService) {}

  onSubmit() {
    console.log(this.data.value);
    this.apiService.signUp(this.data.value);
  }
}
