import { Component } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { IMusic } from '../shared/IMusic';

@Component({
  selector: 'admin-music',
  templateUrl: './adminMusic.component.html',
})
export class AdminMusicComponent {
  search = new FormControl('');
  music: IMusic[] = [
    {
      id: '1',
      musicAlbum: 'Master of Puppets',
      musicArtist: 'Metallica',
      musicName: 'Master of Puppets',
      musicPosterUrl:
        'https://upload.wikimedia.org/wikipedia/en/b/b2/Metallica_-_Master_of_Puppets_cover.jpg',
      musicUrl: 'https://www.youtube.com/watch?v=0obBdrfUMzU',
    },
    {
      id: '2',
      musicAlbum: 'Reign Of Blood',
      musicArtist: 'Slayer',
      musicName: 'Angel of Death',
      musicPosterUrl:
        'https://townsquare.media/site/366/files/2019/10/6180E4ZWl2L._SY355_.jpg?w=355&q=75',
      musicUrl: 'https://www.youtube.com/watch?v=TnRZhLRv6eM',
    },
  ];
  currentMusicToEdit: IMusic = this.music[0];

  editMusic = this.fb.group(this.currentMusicToEdit);

  constructor(private fb: FormBuilder) {}

  onEdit(id) {
    this.currentMusicToEdit = this.music.find((u) => u.id === id);
    this.editMusic.patchValue(this.currentMusicToEdit);
  }

  onUpdateUserDetails() {
    console.log(this.editMusic.value);
  }

  onSearch() {
    console.log(this.search.value);
  }
}
