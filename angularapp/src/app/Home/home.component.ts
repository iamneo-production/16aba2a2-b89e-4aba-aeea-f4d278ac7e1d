import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { IMusic } from '../shared/IMusic';

@Component({
  selector: 'app-home',
  template: ` <p>Home</p> `,
})
export class HomeComponent implements OnInit, OnDestroy {
  music: IMusic[] = null;
  musicUpdates = this.apiService.musicUpdates.subscribe({
    next: (data) => {
      this.music = data;
    },
  });
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getAllMusic();
  }
  ngOnDestroy() {}
}
