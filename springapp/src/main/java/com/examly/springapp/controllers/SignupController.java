package com.examly.springapp.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.examly.springapp.model.Role;
import com.examly.springapp.model.SignUp;
import com.examly.springapp.repos.UserRepository;
import com.examly.springapp.services.UserService;
import com.examly.springapp.utils.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class SignupController {
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<?> saveUser(@RequestBody SignUp body) {
        if (!userRepository.findByEmail(body.getEmail()).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email Already Exists");
        }

        userService.addUser(body.getEmail(), body.getPassword(), body.getUsername());

        UserDetails user = userDetailsService.loadUserByUsername(body.getEmail());
        String token = jwtUtil.generateToken(user);
        return new ResponseEntity<>(token, HttpStatus.CREATED);
    }

    @PostMapping("/admin/signup")
    public ResponseEntity<?> saveAdminUser(@RequestBody SignUp body) {
        if (!userRepository.findByEmail(body.getEmail()).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email Already Exists");
        }

        userService.addUser(body.getEmail(), body.getPassword(), body.getUsername(), Role.ROLE_ADMIN);

        UserDetails user = userDetailsService.loadUserByUsername(body.getEmail());
        String token = jwtUtil.generateToken(user);
        return new ResponseEntity<>(token, HttpStatus.CREATED);
    }
}
