package me.aryanrawlani.BackendHackerNews.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.ZonedDateTime;

@Data
@Document(collection = "posts")
public class Post {
    @Id
    String id;

    String author;
    String creationDate;

    int descendents;
    int points;

    String text;
    String title;
    String url;
    
    public Post(String author, String creationDate, int descendents, int points, String text, String title, String url) {
        this.author = author;
        this.creationDate = creationDate;
        this.descendents = descendents;
        this.points = points;
        this.text = text;
        this.title = title;
        this.url = url;
    }
}
