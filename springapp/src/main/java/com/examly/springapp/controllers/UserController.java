package com.examly.springapp.controllers;

import com.examly.springapp.model.Login;
import com.examly.springapp.model.SignUp;
import com.examly.springapp.repos.UserRepository;
import com.examly.springapp.services.UserService;
import com.examly.springapp.utils.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class UserController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    // Login Handler
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Login body) {
        authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(body.getEmail(),
                        body.getPassword()));

        UserDetails user = userDetailsService.loadUserByUsername(body.getEmail());
        String token = jwtUtil.generateToken(user);

        return new ResponseEntity<>(token, HttpStatus.OK);
    }

    // Signup Handler
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignUp body) {
        if (!userRepository.findByEmail(body.getEmail()).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email Already Exists");
        }

        userService.addUser(body.getEmail(), body.getPassword(), body.getUsername());

        UserDetails user = userDetailsService.loadUserByUsername(body.getEmail());
        String token = jwtUtil.generateToken(user);
        return new ResponseEntity<>(token, HttpStatus.CREATED);
    }

}
