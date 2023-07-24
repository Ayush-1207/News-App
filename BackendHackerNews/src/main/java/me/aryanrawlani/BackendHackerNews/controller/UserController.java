package me.aryanrawlani.BackendHackerNews.controller;

import me.aryanrawlani.BackendHackerNews.model.User;
import me.aryanrawlani.BackendHackerNews.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/users/{id}")
    public User getUser(@PathVariable String id) {
        User user = userService.getUserByUsername(id);

        if (user == null) {
            user = userService.getUserByID(id);
        }

        return user;
    }

    @GetMapping("/users")
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @PutMapping("/users/{id}")
    public User updateUser(@PathVariable String id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }
}
