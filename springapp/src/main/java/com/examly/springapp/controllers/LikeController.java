package com.examly.springapp.controllers;

import java.util.Map;
import java.util.Optional;

import com.examly.springapp.model.Like;
import com.examly.springapp.model.Music;
import com.examly.springapp.model.User;
import com.examly.springapp.repos.LikeRepository;
import com.examly.springapp.repos.MusicRepository;
import com.examly.springapp.repos.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LikeController {
    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private MusicRepository musicRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/like/{id}")
    public ResponseEntity<?> addLike(@PathVariable String id) {
        Optional<Music> music = musicRepository.findById(id);

        if (music.isEmpty()) {

        }

        Optional<Like> like = likeRepository.findByMusicId(music.get());
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        Optional<User> user = userRepository.findByEmail(userEmail);

    }
}
