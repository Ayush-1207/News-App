package me.aryanrawlani.BackendHackerNews.model;

import lombok.Data;

import java.util.List;

@Data
public class CommentThread {
    Comment rootComment;
    List<Comment> replies;
}
