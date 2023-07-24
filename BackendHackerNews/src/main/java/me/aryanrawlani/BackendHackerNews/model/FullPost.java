package me.aryanrawlani.BackendHackerNews.model;

import lombok.Data;

import java.util.List;

@Data
public class FullPost {
    Post post;
    List<Comment> comments;

    public FullPost(Post post, List<Comment> comments) {
        this.post = post;
        this.comments = comments;
    }
}
