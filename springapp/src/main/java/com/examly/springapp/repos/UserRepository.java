package com.examly.springapp.repos;

import java.util.List;
import java.util.Optional;

import com.examly.springapp.model.User;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

@Service
public interface UserRepository extends CrudRepository<User, Integer> {
    public Optional<User> findByEmail(String email);

    @Query(value = "select u from user p where concat(u.name, ' ', u.email, ' ', u.username) like %?1%")
    public List<User> search(String keyword);

    public void deleteByEmail(String email);
}
