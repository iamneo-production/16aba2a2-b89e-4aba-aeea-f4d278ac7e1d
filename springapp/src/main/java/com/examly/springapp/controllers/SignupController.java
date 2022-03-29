package com.examly.springapp.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;

import com.examly.springapp.model.Role;
import com.examly.springapp.model.SignUp;
import com.examly.springapp.repos.UserRepository;
import com.examly.springapp.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@Validated
public class SignupController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<?> saveUser(@Valid @RequestBody SignUp body) {
        if (userRepository.findByEmail(body.getEmail()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email Already Exists");
        }

        if (userRepository.findByMobileNumber(body.getMobileNumber()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Mobile Number Already Exists");
        }
        userService.addUser(body.getEmail(), body.getPassword(), body.getUsername(), body.getMobileNumber());

        return new ResponseEntity<>("Added User Successfully", HttpStatus.CREATED);
    }

    @PostMapping("/admin/signup")
    public ResponseEntity<?> saveAdminUser(@Valid @RequestBody SignUp body) {
        if (userRepository.findByEmail(body.getEmail()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email Already Exists");
        }

        if (userRepository.findByMobileNumber(body.getMobileNumber()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Mobile Number Already Exists");
        }

        userService.addUser(body.getEmail(), body.getPassword(), body.getUsername(), body.getMobileNumber(),
                Role.ROLE_ADMIN);

        return new ResponseEntity<>("Added Admin Successfully", HttpStatus.CREATED);
    }
}
