package com.examly.springapp.controllers;

import java.util.Optional;

import com.examly.springapp.model.Music;
import com.examly.springapp.model.User;
import com.examly.springapp.repos.MusicRepository;
import com.examly.springapp.repos.UserRepository;
import com.examly.springapp.services.MusicService;

import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LikeController {

    @Autowired
    private MusicService musicService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MusicRepository musicRepository;

    @PostMapping("/like/{id}")
    public ResponseEntity<?> addLike(@PathVariable String id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        String userEmail = auth.getName();
        Optional<User> user = userRepository.findByEmail(userEmail);
        Optional<Music> music = musicRepository.findById(id);

        if (music.isEmpty() || user.isEmpty()) {
            return new ResponseEntity<>("Music not found", HttpStatus.NOT_FOUND);
        }
        musicService.addMusicUser(id, user.get());

        return ResponseEntity.ok("Like added to song");
    }

    @DeleteMapping("/like/{id}")
    public ResponseEntity<?> deleteLike(@PathVariable String id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        String userEmail = auth.getName();
        Optional<User> user = userRepository.findByEmail(userEmail);
        Optional<Music> music = musicRepository.findById(id);

        if (music.isEmpty() || user.isEmpty()) {
            return new ResponseEntity<>("Music not found", HttpStatus.NOT_FOUND);
        }
        musicService.deleteMusicUser(id, user.get());

        return ResponseEntity.ok("Like deleted");
    }
}
