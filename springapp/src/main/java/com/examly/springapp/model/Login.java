package com.examly.springapp.model;

import javax.validation.constraints.Email;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Login {
    @Email
    private String email;
    private String password;
}
