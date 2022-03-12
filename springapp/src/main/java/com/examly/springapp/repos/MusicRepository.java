package com.examly.springapp.repos;

import java.util.List;

import com.examly.springapp.model.Music;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

@Service
public interface MusicRepository extends CrudRepository<Music, String> {
    @Query(value = "Select m from music m  where concat(m.musicName , ' ', m.musicAlbum, ' ', p.musicArtist, ' ', ) like %?1%", nativeQuery = true)
    public List<Music> search(String query);
}
