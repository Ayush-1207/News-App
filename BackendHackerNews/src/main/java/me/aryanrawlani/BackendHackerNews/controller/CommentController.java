package me.aryanrawlani.BackendHackerNews.controller;

import me.aryanrawlani.BackendHackerNews.model.Comment;
import me.aryanrawlani.BackendHackerNews.model.CommentThread;
import me.aryanrawlani.BackendHackerNews.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CommentController {

    @Autowired
    CommentService commentService;

    @GetMapping("/newcomments")
    public List<Comment> getNewestComments() {
        return commentService.getCommentsByNew();
    }

    @GetMapping("/reply/{toCommentID}")
    public Comment getComment(@PathVariable String toCommentID) {
        return commentService.getComment(toCommentID);
    }

    @PostMapping("/reply/{toCommentID}")
    public void postComment(@RequestBody Comment comment, @PathVariable String toCommentID) {
        commentService.saveComment(comment);
    }

    @PostMapping("/posts/{postID}")
    public void postRootComment(@RequestBody Comment comment) {
        commentService.saveComment(comment);
    }

    @GetMapping("/posts/{postID}/{commentID}")
    public CommentThread getThread(@PathVariable String postID, @PathVariable String commentID) {
        return commentService.getThread(postID, commentID);
    }
}
