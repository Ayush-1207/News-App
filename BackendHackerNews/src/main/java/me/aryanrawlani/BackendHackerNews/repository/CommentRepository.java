package me.aryanrawlani.BackendHackerNews.repository;

import me.aryanrawlani.BackendHackerNews.model.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends MongoRepository<Comment, String> {
    List<Comment> findCommentsByPostID(String postID);

    List<Comment> findCommentsByAuthorIsNotNullOrderByTimeOfCommentDesc();

    List<Comment> findAllByTimeOfCommentNotNullOrderByTimeOfComment();

    Comment findCommentById(String commentID);

    List<Comment> findCommentsByPostIDAndParentIDEquals(String postID, String parentID);
}
