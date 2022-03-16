package com.examly.springapp.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Embeddable
public class Like {

    @Column(nullable = false)
    private int noOfLike = 0;

    @OneToMany(targetEntity = User.class, fetch = FetchType.EAGER)
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
