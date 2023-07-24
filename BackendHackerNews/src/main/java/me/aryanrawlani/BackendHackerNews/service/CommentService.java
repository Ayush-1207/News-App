package me.aryanrawlani.BackendHackerNews.service;

import me.aryanrawlani.BackendHackerNews.model.Comment;
import me.aryanrawlani.BackendHackerNews.model.CommentThread;
import me.aryanrawlani.BackendHackerNews.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CommentService {
    private final CommentRepository commentRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public List<Comment> getCommentsForPost(String postID) {
        return commentRepository.findCommentsByPostID(postID);
    }

    public List<Comment> getCommentsByNew() {
        List<Comment> comments = commentRepository.findCommentsByAuthorIsNotNullOrderByTimeOfCommentDesc();

        return comments;
    }

    public Comment getComment(String id) {
        return commentRepository.findCommentById(id);
    }

    public void saveComment(Comment comment) {
        commentRepository.save(comment);
    }

    public CommentThread getThread(String postID, String commentID) {
        CommentThread commentThread = new CommentThread();

        commentThread.setRootComment(getComment(commentID));

        commentThread.setReplies(commentRepository.findCommentsByPostIDAndParentIDEquals(postID, commentID));

        return commentThread;
    }
}
