import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from '../../services/api.service';
import { IMusic } from '../../shared/IMusic';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  music: IMusic[] = null;
  musicUpdates = this.apiService.userMusicUpdates.subscribe({
    next: (data) => {
      this.music = data;
    },
  });
  search = new FormControl('');
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getAllMusic();
  }
  ngOnDestroy() {
    this.musicUpdates.unsubscribe();
  }

  onSearch() {
    console.log(this.search.value);
  }
}
