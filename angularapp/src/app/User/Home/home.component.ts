import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { IMusic } from '../../shared/IMusic';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  music: IMusic[] = null;
  allMusic: IMusic[] = null;

  musicUpdates = this.apiService.userMusicUpdates.subscribe({
    next: (data) => {
      this.music = data;
    },
  });

  allMusicUpdates = this.apiService.musicUpdates.subscribe({
    next: (data) => {
      this.allMusic = data;
    },
  });

  search = new FormControl('');
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.apiService.getAllMusic();
  }
  ngOnDestroy() {
    this.musicUpdates.unsubscribe();
    this.allMusicUpdates.unsubscribe();
  }

  onSearch() {
    console.log(this.search.value);
  }

  onCardClick(musicId: string) {
    this.router.navigateByUrl(`music/${musicId}`);
  }
}
