package com.examly.springapp.controllers;

import com.examly.springapp.model.Login;
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
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> checkUser(@RequestBody Login body) {
        authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(body.getEmail(),
                        body.getPassword()));

        UserDetails user = userDetailsService.loadUserByUsername(body.getEmail());
        String token = jwtUtil.generateToken(user);

        return new ResponseEntity<>(token, HttpStatus.OK);
    }

    @PostMapping("/admin/login")
    public ResponseEntity<?> checkAdminUser(@RequestBody Login body) {
        authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(body.getEmail(),
                        body.getPassword()));

        UserDetails user = userDetailsService.loadUserByUsername(body.getEmail());
        String token = jwtUtil.generateToken(user);

        return new ResponseEntity<>(token, HttpStatus.OK);
    }
}
