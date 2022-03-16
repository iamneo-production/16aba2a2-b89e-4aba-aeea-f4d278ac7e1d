package com.examly.springapp.model;

import javax.validation.constraints.Email;

import org.hibernate.validator.constraints.Length;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignUp {
    @Email
    private String email;
    private String password;
    private String username;
    @Length(min = 10, max = 10)
    private String mobileNumber;

}
