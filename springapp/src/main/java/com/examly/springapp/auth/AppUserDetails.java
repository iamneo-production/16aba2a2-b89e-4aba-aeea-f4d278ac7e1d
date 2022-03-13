package com.examly.springapp.auth;

import java.util.Arrays;
import java.util.Collection;

import com.examly.springapp.model.User;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class AppUserDetails implements UserDetails {
    // It will be the email field in the User Model
    private String username;
    private String password;
    private String role;
    private Boolean active;

    public AppUserDetails(User user) {
        username = user.getEmail();
        password = user.getPassword();
        role = user.getRole().toString();
        active = user.getActive();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Arrays.asList(new SimpleGrantedAuthority(role));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return active;
    }

}
