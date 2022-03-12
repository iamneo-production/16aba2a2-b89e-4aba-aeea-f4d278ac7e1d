package com.examly.springapp.controllers;

import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    // @Autowired
    // private AuthenticationManager authenticationManager;

    // @Autowired
    // private UserDetailsService userDetailsService;

    // @Autowired
    // private JwtUtil jwtUtil;

    // @PostMapping("/login")
    // public ResponseEntity<?> login(@RequestBody Login body) {
    // authenticationManager
    // .authenticate(new UsernamePasswordAuthenticationToken(body.getEmail(),
    // body.getPassword()));

    // UserDetails user = userDetailsService.loadUserByUsername(body.getEmail());
    // String token = jwtUtil.generateToken(user);

    // return new ResponseEntity<String>(token, HttpStatus.CREATED);
    // }

}
