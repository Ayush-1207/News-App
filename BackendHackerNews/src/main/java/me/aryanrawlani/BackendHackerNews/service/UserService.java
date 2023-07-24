package me.aryanrawlani.BackendHackerNews.service;

import me.aryanrawlani.BackendHackerNews.model.User;
import me.aryanrawlani.BackendHackerNews.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserByID(String userID) {
        return userRepository.findUserById(userID);
    }

    public User getUserByUsername(String username) {
        return userRepository.findUserByUsername(username);
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User updateUser(String userID, User newUser) {
        User user = userRepository.findUserById(userID);

        return userRepository.findUserById(userID);
    }

    public String getUsernameByUserID(String userID) {
        return getUserByID(userID).getUsername();
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user = getUserByUsername(s);

        if (user == null) return null;

        String name = user.getUsername();
        String password = user.getPassword();

        return new org.springframework.security.core.userdetails.User(name, password, new ArrayList<>());
    }
}
