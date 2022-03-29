package com.examly.springapp.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import org.hibernate.annotations.GenericGenerator;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "like_table")
public class Like {
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    @Column(name = "like_id", columnDefinition = "CHAR(32)")
    @Id
    private String Id;

    @Column(nullable = false, columnDefinition = "int default 0")
    private int noOfLike = 0;

    @ManyToMany(targetEntity = User.class, fetch = FetchType.EAGER)
    private List<User> likedUser = new ArrayList<>();

    public void updateNoOfLike() {
        setNoOfLike(likedUser.size());
    }

    public void appendToLikedUser(User user) {
        if (likedUser.isEmpty()) {
            setLikedUser(Arrays.asList(user));
        } else {
            likedUser.add(user);
        }
    }

    public void removefromLikedUser(User user) {
        likedUser.removeIf(u -> u.getId() == user.getId());
    }

}
