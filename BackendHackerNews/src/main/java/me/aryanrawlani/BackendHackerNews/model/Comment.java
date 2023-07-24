package me.aryanrawlani.BackendHackerNews.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "comments")
public class Comment {
    @Id
    String id;

    String postID;

    String parentID;

    String author;
    String text;
    String timeOfComment;
}
