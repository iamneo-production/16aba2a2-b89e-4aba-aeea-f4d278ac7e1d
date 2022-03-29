import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { IUser } from '../../shared/IUser';
import { PHONE_NUMBER } from '../../shared/regexPattern';

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

      if (this.users.length <= 0) return;
      this.currentUserToEdit = this.users[0];
      this.editUser = this.fb.group({
        id: [this.currentUserToEdit.id],
        username: [this.currentUserToEdit.username],
        email: [this.currentUserToEdit.email, Validators.email],
        mobileNumber: [
          this.currentUserToEdit.mobileNumber,
          [Validators.pattern(PHONE_NUMBER)],
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
  }

  onEdit(id) {
    this.currentUserToEdit = this.users.find((u) => u.id === id);
    this.editUser.patchValue(this.currentUserToEdit);
  }

  onUpdateUserDetails() {
    console.log(this.editUser.value);
    this.apiService.updateUser(this.editUser.value);
  }

  onDelete(id) {
    this.apiService.deleteUser(id);
  }

  onSearch() {
    console.log(this.search.value);
  }
}
