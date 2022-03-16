package com.examly.springapp.controllers;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.examly.springapp.model.Music;
import com.examly.springapp.model.MusicRequestBody;
import com.examly.springapp.repos.MusicRepository;
import com.examly.springapp.services.MusicService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MusicController {
    @Autowired
    private MusicRepository musicRepository;

    @Autowired
    private MusicService musicService;

    @GetMapping({ "/music", "/admin/music" })
    public ResponseEntity<?> getAllMusic() {
        List<Music> allMusic = musicService.getAllMusic();
        return ResponseEntity.ok(allMusic);
    }

    @PostMapping("/admin/addMusic")
    public ResponseEntity<?> addMusic(@RequestBody MusicRequestBody musicData) {
        musicService.addMusic(musicData.getMusicName(), musicData.getMusicUrl(), musicData.getMusicPosterUrl(),
                musicData.getMusicAlbum(), musicData.getMusicArtist());

        return new ResponseEntity<>("Music added", HttpStatus.CREATED);
    }

    @GetMapping({ "/music/{id}", "/admin/music/{id}" })
    public ResponseEntity<?> getMusic(@PathVariable String id) {
        Optional<Music> music = musicRepository.findById(id);
        return ResponseEntity.ok(music);
    }

    @DeleteMapping("/admin/music/{id}")
    public ResponseEntity<?> deleteMusic(@PathVariable String id) {
        musicService.deleteMusic(id);
        return ResponseEntity.ok("Deleted Music");
    }

    @PutMapping("/admin/music/{id}")
    public ResponseEntity<?> updateMusic(@PathVariable String id, @RequestBody Map<String, String> body) {

        Optional<Music> music = musicRepository.findById(id);
        if (music.isEmpty()) {
            return new ResponseEntity<>("Music not found", HttpStatus.NOT_FOUND);
        }

        Music musicFound = music.get();

        body.forEach((key, value) -> {
            switch (key) {
                case "musicName":
                    musicFound.setMusicName(value);
                    break;
                case "musicAlbum":
                    musicFound.setMusicAlbum(value);
                    break;
                case "musicArtist":
                    musicFound.setMusicArtist(value);
                    break;
                case "musicPosterUrl":
                    musicFound.setMusicPosterUrl(value);
                    break;
                case "musicUrl":
                    musicFound.setMusicUrl(value);
                    break;
                default:
                    break;
            }
        });

        musicService.updateMusic(musicFound);

        return ResponseEntity.ok("Updated Music");
    }

}
