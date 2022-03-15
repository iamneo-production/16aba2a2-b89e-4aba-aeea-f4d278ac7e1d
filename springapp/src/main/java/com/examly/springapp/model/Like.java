package com.examly.springapp.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Embeddable;
// import javax.persistence.FetchType;
// import javax.persistence.MapsId;
import javax.persistence.OneToMany;
import javax.persistence.PostUpdate;
// import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Embeddable
public class Like {

    @Column(nullable = false)
    private int noOfLike = 0;

    @OneToMany(targetEntity = User.class)
    @JsonIgnore
    private List<User> likedUser = new ArrayList<>();

    @PostUpdate
    public void updateNoOfLike() {
        if (likedUser == null) {
            setNoOfLike(0);
        } else {
            setNoOfLike(likedUser.size());
        }

    }

    public void appendToLikedUser(User user) {
        if (likedUser.isEmpty()) {
            setLikedUser(Arrays.asList(user));
        } else {
            likedUser.add(user);
        }
    }

}
