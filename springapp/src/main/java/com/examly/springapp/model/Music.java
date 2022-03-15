package com.examly.springapp.model;

// import javax.persistence.CascadeType;
// import javax.persistence.CascadeType;
// import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
// import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
// import javax.persistence.JoinColumn;
// import javax.persistence.MapsId;
// import javax.persistence.JoinColumn;
// import javax.persistence.OneToOne;
// import javax.persistence.PrimaryKeyJoinColumn;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.validator.constraints.URL;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class Music {
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    @Column(columnDefinition = "CHAR(32)")
    @Id
    private String musicId;

    @NotNull
    @Column(name = "musicName")
    private String musicName;

    @NotNull
    @Column(name = "musicUrl")
    @URL
    private String musicUrl;

    @NotNull
    @Column(name = "musicArtist")
    private String musicArtist;

    @NotNull
    @NotNull
    @Column(name = "musicAlbum")
    private String musicAlbum;

    @NotNull
    @Column(name = "musicPosterUrl")
    private String musicPosterUrl;

    // @OneToOne(mappedBy = "musicId")
    // private Like like;

}
