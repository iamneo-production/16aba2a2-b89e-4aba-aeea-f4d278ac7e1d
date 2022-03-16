package com.examly.springapp.model;

import org.hibernate.validator.constraints.URL;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class MusicRequestBody {
    private String musicName;

    @URL
    private String musicUrl;
    private String musicArtist;

    private String musicAlbum;

    @URL
    private String musicPosterUrl;
}
