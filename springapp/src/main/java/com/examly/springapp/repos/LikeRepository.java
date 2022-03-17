package com.examly.springapp.repos;

import com.examly.springapp.model.Like;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

@Service
public interface LikeRepository extends CrudRepository<Like, String> {

}
