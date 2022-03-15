package com.examly.springapp.repos;

import java.util.Optional;

import com.examly.springapp.model.Like;
import com.examly.springapp.model.Music;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

@Service
public interface LikeRepository extends CrudRepository<Like, Integer> {
    Optional<Like> findByMusicId(Music music);
}
