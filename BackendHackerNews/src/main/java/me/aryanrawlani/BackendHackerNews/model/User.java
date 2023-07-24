package me.aryanrawlani.BackendHackerNews.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.lang.reflect.Array;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Date;

@NoArgsConstructor
@Data
@Document(collection = "users")
public class User {
    @Id
    private String id;

    private String createdOn;

    private String about;
    private String email;

    private ArrayList<String> hiddenPosts;
    private ArrayList<String> upvotedPosts;

    private int karma;

    private String username;
    private String password;

    public User(String createdOn, String about, String email, int karma, String username, String password, ArrayList<String> hiddenPosts, ArrayList<String> upvotedPosts) {
        this.createdOn = createdOn;
        this.about = about;
        this.email = email;
        this.karma = karma;
        this.username = username;
        this.password = password;

        this.hiddenPosts = hiddenPosts;
        this.upvotedPosts = upvotedPosts;
    }
}
