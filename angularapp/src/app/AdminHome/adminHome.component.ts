import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IUser } from '../shared/IUser';

@Component({
  selector: 'admin-home',
  templateUrl: './adminHome.component.html',
})
export class AdminHomeComponent {
  search = new FormControl('');
  users: IUser[] = [
    {
      id: 1,
      mobileNumber: '3475748456',
      email: 'u1@g.com',
      username: 'u1',
      password: '',
    },

    {
      id: 2,
      email: 'u2@g.com',
      username: 'u2',
      mobileNumber: '3475748456',
      password: '',
    },
  ];
  currentUserToEdit: IUser = this.users[0];
  editUser = this.fb.group({
    username: [this.currentUserToEdit.username || ''],
    email: [this.currentUserToEdit.email || '', Validators.email],
    mobileNumber: [
      this.currentUserToEdit.mobileNumber || '',
      [Validators.min(10), Validators.max(10)],
    ],
    password: [''],
  });

  constructor(private fb: FormBuilder) {}

  onEdit(id) {
    this.currentUserToEdit = this.users.find((u) => u.id === id);
    this.editUser.patchValue(this.currentUserToEdit);
  }

  onUpdateUserDetails() {
    console.log(this.editUser.value);
  }

  onSearch() {
    console.log(this.search.value);
  }
}
