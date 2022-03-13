package com.examly.springapp.utils;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

/**
 * Token based auth handler
 */
@Service
public class JwtUtil {
    /**
     * Secret which acts as a signature ( Should be kept in a safe locaion , only
     * here for test purpose)
     */
    private SecretKey secret = Keys
            .hmacShaKeyFor("djfhdfgjkghjbdfghdsfjhfdghsdfdfdsf".getBytes(StandardCharsets.UTF_8));

    public String generateToken(UserDetails user) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, user.getUsername());
    }

    /***
     * Token creator
     */
    public String createToken(Map<String, Object> claims, String subject) {

        Claims payload = Jwts.claims(claims);
        payload.setSubject(subject);
        return Jwts.builder()
                .setClaims(payload)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .signWith(secret)
                .compact();

    }

    /**
     * Extract Username(Email)
     */
    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    public Claims extractClaims(String token) throws JwtException {
        return Jwts.parserBuilder().setSigningKey(secret)
                .build().parseClaimsJws(token).getBody();
    }

    public Boolean isTokenExpired(String token) throws ExpiredJwtException {
        return extractClaims(token).getExpiration().before(new Date());
    }

    /** Verify whether token is valid or invalid */
    public Boolean validateToken(String token, UserDetails user) {
        String username = extractUsername(token);
        Boolean isExpired = isTokenExpired(token);

        return ((user.getUsername().equals(username)) && !isExpired);
    }
}
