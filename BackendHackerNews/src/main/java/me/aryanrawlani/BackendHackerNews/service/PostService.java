package me.aryanrawlani.BackendHackerNews.service;

import me.aryanrawlani.BackendHackerNews.model.Post;
import me.aryanrawlani.BackendHackerNews.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    private final PostRepository postRepository;

    @Autowired
    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public List<Post> getPosts() {
        return postRepository.findPostsByTitleIsNotNullOrderByPointsDesc();
    }

    public List<Post> getNewestPosts() {
        return postRepository.findPostsByTitleIsNotNullOrderByCreationDateDesc();
    }


    public Post getPostByID(String postID) {
        return postRepository.findPostById(postID);
    }

    public void savePost(Post post) {
        postRepository.save(post);
    }

    public ResponseEntity<Post> upvotePost(String postID, boolean toAdd) {
        Optional<Post> post = Optional.ofNullable(getPostByID(postID));

        if (post.isPresent()) {
            Post _post = post.get();
            int points = toAdd ? +1 : -1;

            _post.setPoints(_post.getPoints() + points);
            return new ResponseEntity<>(postRepository.save(_post), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
