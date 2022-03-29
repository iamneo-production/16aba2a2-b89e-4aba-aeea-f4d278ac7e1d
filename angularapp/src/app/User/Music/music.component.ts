import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { IMusic } from 'src/app/shared/IMusic';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
})
export class MusicComponent implements OnInit, OnDestroy {
  search = new FormControl('');
  currentSelectedMusic: IMusic = null;
  currentMusicToPlay: IMusic = null;
  music: IMusic[] = null;
  musicUpdates = this.apiService.musicUpdates.subscribe({
    next: (data) => {
      this.music = data;
    },
  });

  constructor(private apiService: ApiService) {}

  onPlay(id: string) {
    console.log('Playing....');
    this.currentMusicToPlay = this.music.find((m) => m.musicId === id);
  }

  onSelect(id: string) {
    this.currentSelectedMusic = this.music.find((m) => m.musicId === id);
  }

  onSearch() {
    console.log(this.search.value);
  }

  addLike(id: string) {
    this.apiService.addLike(id);
    this.currentSelectedMusic.like.noOfLike += 1;
  }

  removeLike(id: string) {
    this.apiService.removeLike(id);
    this.currentSelectedMusic.like.noOfLike -= 1;
  }
  ngOnInit(): void {
    this.apiService.getAllMusic();
  }

  ngOnDestroy(): void {}
}
