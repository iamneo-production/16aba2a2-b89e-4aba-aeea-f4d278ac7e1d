package com.examly.springapp.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.examly.springapp.model.Like;
import com.examly.springapp.model.Music;
import com.examly.springapp.repos.LikeRepository;
import com.examly.springapp.repos.MusicRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MusicService {
    @Autowired
    private MusicRepository musicRepository;

    @Autowired
    private LikeRepository likeRepository;

    public void addMusic(String musicName, String musicUrl, String musicPosterUrl, String musicAlbum,
            String musicArtist) {

        Music music = new Music();

        music.setMusicAlbum(musicAlbum);
        music.setMusicArtist(musicArtist);
        music.setMusicPosterUrl(musicPosterUrl);
        music.setMusicName(musicName);
        music.setMusicUrl(musicUrl);

        Like like = new Like();
        like.setMusicId(music);
        likeRepository.save(like);

    }

    public List<Music> searchMusic(String query) {
        return musicRepository.search(query);
    }

    public List<Music> getAllMusic() {
        List<Music> allMusic = new ArrayList<>();

        musicRepository.findAll().forEach(allMusic::add);

        return allMusic;
    }

    public void updateMusic(Music music) {
        musicRepository.save(music);
    }

    public void updateMusicName(String id, String name) {
        Optional<Music> music = musicRepository.findById(id);

        if (music.isPresent()) {
            Music musicFound = music.get();
            musicFound.setMusicName(name);

            musicRepository.save(musicFound);
        }
    }

    public void updateMusicArtist(String id, String artist) {
        Optional<Music> music = musicRepository.findById(id);

        if (music.isPresent()) {
            Music musicFound = music.get();
            musicFound.setMusicArtist(artist);
            ;

            musicRepository.save(musicFound);
        }
    }

    public void updateMusicAlbum(String id, String album) {
        Optional<Music> music = musicRepository.findById(id);

        if (music.isPresent()) {
            Music musicFound = music.get();
            musicFound.setMusicAlbum(album);

            musicRepository.save(musicFound);
        }
    }

    public void updateMusicPosterUrl(String id, String url) {
        Optional<Music> music = musicRepository.findById(id);

        if (music.isPresent()) {
            Music musicFound = music.get();
            musicFound.setMusicPosterUrl(url);
            ;

            musicRepository.save(musicFound);
        }
    }

    public void updateMusicUrl(String id, String url) {
        Optional<Music> music = musicRepository.findById(id);

        if (music.isPresent()) {
            Music musicFound = music.get();
            musicFound.setMusicUrl(url);
            ;

            musicRepository.save(musicFound);
        }
    }

    public void deleteMusic(String musicId) {
        musicRepository.deleteById(musicId);
    }
}
