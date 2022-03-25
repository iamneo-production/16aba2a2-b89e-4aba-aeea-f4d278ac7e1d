import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { URL_PATTERN } from '../../shared/regexPattern';

@Component({
  selector: 'admin-add-music',
  templateUrl: './adminAddMusic.component.html',
})
export class AdminAddMusicComponent {
  constructor(private fb: FormBuilder, private apiService: ApiService) {}
  data = this.fb.group({
    musicName: ['', Validators.required],
    musicUrl: ['', [Validators.required, Validators.pattern(URL_PATTERN)]],
    musicPosterUrl: [
      '',
      [Validators.required, Validators.pattern(URL_PATTERN)],
    ],
    musicArtist: ['', Validators.required],
    musicAlbum: ['', Validators.required],
  });

  onSubmit() {
    this.apiService.addMusic(this.data.value);
  }
}
