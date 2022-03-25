import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { IMusic } from '../shared/IMusic';

@Component({
  selector: 'admin-music',
  templateUrl: './adminMusic.component.html',
})
export class AdminMusicComponent implements OnInit, OnDestroy {
  search = new FormControl('');
  music: IMusic[] = null;

  musicUpdates = this.apiService.musicUpdates.subscribe({
    next: (data) => {
      this.music = data;

      this.currentMusicToEdit = this.music[0];
      this.editMusic =
        this.currentMusicToEdit && this.fb.group(this.currentMusicToEdit);
    },
  });
  currentMusicToEdit: IMusic;

  editMusic: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getAllMusic();
  }

  ngOnDestroy(): void {
    this.musicUpdates.unsubscribe();
  }

  onEdit(id) {
    this.currentMusicToEdit = this.music.find((u) => u.musicId === id);
    this.editMusic.patchValue(this.currentMusicToEdit);
  }

  onDelete(id) {
    this.apiService.deleteMusic(id);
  }

  onUpdateMusicDetails() {
    const { like, ...data } = this.editMusic.value as IMusic;
    this.apiService.updateMusic(data);
  }

  onSearch() {
    console.log(this.search.value);
  }
}
