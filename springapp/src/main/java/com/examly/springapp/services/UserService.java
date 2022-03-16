package com.examly.springapp.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    public void updateUser(User user) {
        userRepository.save(user);
    }

    public void updateUserUsername(int id, String username) {
        Optional<User> userFound = userRepository.findById(id);

        if (!userFound.isEmpty()) {
            User user = userFound.get();

            user.setUsername(username);
            userRepository.save(user);
        }

    }

    public void updateUserPassword(int id, String password) {
        Optional<User> userFound = userRepository.findById(id);

        if (!userFound.isEmpty()) {
            User user = userFound.get();

            user.setPassword(password);
            ;
            userRepository.save(user);
        }

    }

    public void updateUserFields(int id, String username, String password) {
        Optional<User> userFound = userRepository.findById(id);

        if (!userFound.isEmpty()) {
            User user = userFound.get();

            user.setUsername(username);
            user.setPassword(password);
            userRepository.save(user);
        }

    }

    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }

    public void deleteUser(String email) {
        userRepository.deleteByEmail(email);
    }

    public List<User> getAllUsers() {
        List<User> allUser = new ArrayList<>();

        userRepository.findByRole(Role.ROLE_USER).forEach(allUser::add);
        return allUser;
    }
}
