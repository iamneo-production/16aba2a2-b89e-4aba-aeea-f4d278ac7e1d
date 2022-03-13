package com.examly.springapp.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.PostUpdate;

import org.hibernate.annotations.GenericGenerator;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class Like {
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    @Column(columnDefinition = "CHAR(32)")
    @Id
    private String musicId;

    @Column(nullable = false)
    private int noOfLike = 0;

    @OneToMany(targetEntity = User.class)
    private List<User> likedUser;

    @PostUpdate
    private void updateNoOfLike() {
        setNoOfLike(likedUser.size());
    }
}
