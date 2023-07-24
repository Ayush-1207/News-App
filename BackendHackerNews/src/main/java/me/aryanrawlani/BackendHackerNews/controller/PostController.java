package me.aryanrawlani.BackendHackerNews.controller;

import me.aryanrawlani.BackendHackerNews.model.Comment;
import me.aryanrawlani.BackendHackerNews.model.FullPost;
import me.aryanrawlani.BackendHackerNews.model.Post;
import me.aryanrawlani.BackendHackerNews.service.CommentService;
import me.aryanrawlani.BackendHackerNews.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PostController {

    @Autowired
    PostService postService;

    @Autowired
    CommentService commentService;

    @GetMapping("/posts")
    public List<Post> getPosts() {
        return postService.getPosts();
    }

    @GetMapping("/newest")
    public List<Post> getNewestPosts() {
        return postService.getNewestPosts();
    }

    @GetMapping("/posts/{postID}")
    public FullPost getFullPost(@PathVariable String postID) {
        Post post = postService.getPostByID(postID);
        List<Comment> comments = commentService.getCommentsForPost(postID);

        return new FullPost(post, comments);
    }

    @PutMapping("/posts/{postID}")
    public boolean upvotePost(@PathVariable String postID, @RequestBody boolean toUpvote) {
//        postService.u
        return true;
    }

    @PostMapping("/submit")
    public void addPost(@RequestBody Post post) {
        postService.savePost(post);
    }
}
