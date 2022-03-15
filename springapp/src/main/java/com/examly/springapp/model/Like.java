package com.examly.springapp.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
// import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
// import javax.persistence.MapsId;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PostUpdate;
import javax.persistence.Table;
// import javax.persistence.Transient;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "likes")
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "musicId")
    private Music musicId;

    @Column(nullable = false)
    private int noOfLike = 0;

    @OneToMany(targetEntity = User.class)
    private List<User> likedUser;

    @PostUpdate
    public void updateNoOfLike() {
        if (likedUser == null) {
            setNoOfLike(0);
        } else {
            setNoOfLike(likedUser.size());
        }

    }

}
