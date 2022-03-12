package com.examly.springapp.services;

import java.util.ArrayList;
import java.util.List;

import com.examly.springapp.model.Music;
import com.examly.springapp.repos.MusicRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MusicService {
    @Autowired
    private MusicRepository musicRepository;

    public void addMusic(String musicName, String musicUrl, String musicPosterUrl, String musicAlbum,
            String musicArtist) {
        Music music = new Music();
        music.setMusicAlbum(musicAlbum);
        music.setMusicArtist(musicArtist);
        music.setMusicPosterUrl(musicPosterUrl);
        music.setMusicName(musicName);
        music.setMusicUrl(musicUrl);

        musicRepository.save(music);
    }

    public List<Music> searchMusic(String query) {
        return musicRepository.search(query);
    }

    public List<Music> getAllMusic() {
        List<Music> allMusic = new ArrayList<>();

        musicRepository.findAll().forEach(allMusic::add);
        return allMusic;
    }

    public Music findMusicById(String musicId) {
        return musicRepository.findById(musicId).get();
    }

    public void updateMusic(Music music) {
        musicRepository.save(music);
    }

    public void deleteMusic(String musicId) {
        musicRepository.deleteById(musicId);
    }
}
