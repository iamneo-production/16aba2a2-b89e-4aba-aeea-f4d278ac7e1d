package com.examly.springapp.services;

import java.util.List;

import com.examly.springapp.model.Role;
import com.examly.springapp.model.User;
import com.examly.springapp.repos.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void addUser(String email, String password, String username) {
        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setUsername(username);

        userRepository.save(user);
    }

    public void addUser(String email, String password, String username, Role role) {
        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);
        user.setUsername(username);
        userRepository.save(user);
    }

    public List<User> searchUser(String query) {
        return userRepository.search(query);
    }

    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email).get();
    }

    public User findUserById(int id) {
        return userRepository.findById(id).get();
    }

    public void updateUser(User user) {
        userRepository.save(user);
    }

    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }

    public void deleteUser(String email) {
        userRepository.deleteByEmail(email);
    }
}
