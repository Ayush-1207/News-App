package me.aryanrawlani.BackendHackerNews.repository;

import me.aryanrawlani.BackendHackerNews.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    User findUserById(String id);

    User findUserByUsername(String username);

    User findUserByEmail(String email);
}
