package com.examly.springapp.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MusicRequestBody {
    private String musicName;

    private String musicUrl;
    private String musicArtist;

    private String musicAlbum;

    private String musicPosterUrl;
}
