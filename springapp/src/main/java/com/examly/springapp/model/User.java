package com.examly.springapp.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    @Column(unique = true)
    @Email
    private String email;

    @NotNull
    @Column
    @JsonIgnore
    private String password;

    @NotNull
    @Column
    private String username;

    @NotNull
    @Column
    private Boolean active = true;

    @NotNull
    @Column
    @Enumerated(EnumType.STRING)
    @JsonIgnore
    private Role role = Role.ROLE_USER;

}
