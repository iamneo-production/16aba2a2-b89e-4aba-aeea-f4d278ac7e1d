import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignUpComponent {
  data = new FormBuilder().group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    username: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    mobileNumber: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
    ],
  });
}
