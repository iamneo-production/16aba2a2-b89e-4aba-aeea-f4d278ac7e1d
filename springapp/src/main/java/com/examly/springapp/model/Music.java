package com.examly.springapp.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.validator.constraints.URL;

import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
public class Music {
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    @Column(columnDefinition = "CHAR(32)")
    @Id
    private String musicId;

    @Column(nullable = false)
    private String musicName;

    @Column(nullable = false)
    @URL
    private String musicUrl;

    @Column(nullable = false)
    private String musicArtist;

    @Column(nullable = false)
    private String musicAlbum;

    @Column(nullable = false)
    private String musicPosterUrl;

    @ManyToOne(targetEntity = Like.class, cascade = CascadeType.ALL)
    private Like like;
}
