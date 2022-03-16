package com.examly.springapp.controllers;

import java.util.Map;

import com.examly.springapp.model.SignUp;
import com.examly.springapp.repos.UserRepository;
import com.examly.springapp.services.UserService;

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
import org.springframework.web.server.ResponseStatusException;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @GetMapping("/admin")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PostMapping("/admin/addUser")
    public ResponseEntity<?> addUser(@RequestBody SignUp body) {
        if (!userRepository.findByEmail(body.getEmail()).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email Already Exists");
        }

        if (userRepository.findByMobileNumber(body.getMobileNumber()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Mobile Number Already Exists");
        }

        userService.addUser(body.getEmail(), body.getPassword(), body.getUsername(), body.getMobileNumber());

        return new ResponseEntity<>("User added", HttpStatus.CREATED);
    }

    @DeleteMapping("/admin/delete/{id}")
    public ResponseEntity<?> userDelete(@PathVariable int id) {
        userRepository.deleteById(id);

        return ResponseEntity.ok("User deleted");
    }

    @PutMapping("/admin/userEdit/{id}")
    public ResponseEntity<?> userEditSave(@PathVariable int id, @RequestBody Map<String, String> body) {
        if (!userRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        String username = body.get("username");
        String password = body.get("password");

        if (username != null && password != null) {
            userService.updateUserFields(id, username, password);
        } else if (username != null) {
            userService.updateUserUsername(id, username);
        } else if (password != null) {
            userService.updateUserPassword(id, password);
        }

        return ResponseEntity.ok("User updated");
    }

}
