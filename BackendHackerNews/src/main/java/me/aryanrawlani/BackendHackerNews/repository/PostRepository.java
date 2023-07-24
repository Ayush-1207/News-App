package me.aryanrawlani.BackendHackerNews.repository;


import me.aryanrawlani.BackendHackerNews.model.Comment;
import me.aryanrawlani.BackendHackerNews.model.Post;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends MongoRepository<Post, String> {
    public Post findPostById(String id);


    public List<Post> findPostsByTitleIsNotNullOrderByCreationDateDesc();

    public List<Post> findPostsByTitleIsNotNullOrderByPointsDesc();
}
