import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { IUser } from '../shared/IUser';

@Component({
  selector: 'admin-home',
  templateUrl: './adminHome.component.html',
})
export class AdminHomeComponent implements OnInit, OnDestroy {
  search = new FormControl('');
  users: IUser[] = null;

  usersUpdates = this.apiService.usersUpdates.subscribe({
    next: (data) => {
      this.users = data;

      this.currentUserToEdit = this.users[0];
      this.editUser = this.fb.group({
        id: [this.currentUserToEdit.id],
        username: [this.currentUserToEdit.username],
        email: [this.currentUserToEdit.email, Validators.email],
        mobileNumber: [
          this.currentUserToEdit.mobileNumber,
          [Validators.pattern('[1-9]{1}[0-9]{9}')],
        ],
        password: [''],
      });
    },
  });

  currentUserToEdit: IUser;
  editUser: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getUsers();
  }

  ngOnDestroy(): void {
    this.usersUpdates.unsubscribe();
    this.editUser.valueChanges.subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }

  onEdit(id) {
    this.currentUserToEdit = this.users.find((u) => u.id === id);
    this.editUser.patchValue(this.currentUserToEdit);
  }

  onUpdateUserDetails() {
    this.apiService.updateUser(this.editUser.value);
  }

  onDelete(id) {
    this.apiService.deleteUser(id);
  }

  onSearch() {
    console.log(this.search.value);
  }
}
