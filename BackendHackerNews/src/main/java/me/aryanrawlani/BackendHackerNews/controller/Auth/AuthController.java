package me.aryanrawlani.BackendHackerNews.controller.Auth;

import me.aryanrawlani.BackendHackerNews.model.Auth.AuthRequest;
import me.aryanrawlani.BackendHackerNews.model.Auth.AuthResponse;
import me.aryanrawlani.BackendHackerNews.model.User;
import me.aryanrawlani.BackendHackerNews.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.time.ZonedDateTime;
import java.util.ArrayList;

@RequestMapping("/api")
@RestController
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @GetMapping("/auth/{userID}")
    private boolean isUsernameAvailable(@PathVariable String userID) {
        return userRepository.findUserByUsername(userID) == null;
    }

    @PostMapping("/login")
    private ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        if (authRequest.isSignup()) {
            assert userRepository.findUserByEmail(authRequest.getEmail()) == null;

            User user = new User(ZonedDateTime.now().toString(), "", authRequest.getEmail(), 1, authRequest.getUsername(), authRequest.getPassword(), new ArrayList<String>(), new ArrayList<String>());
            userRepository.save(user);

            final AuthResponse authResponse = new AuthResponse("Sign up successful!", 200);
            authResponse.setUserUID(userRepository.findUserByEmail(authRequest.getEmail()).getId());

            return ResponseEntity.ok(authResponse);
        } else {
            User user = userRepository.findUserByEmail(authRequest.getEmail());

            if (user == null) {
                return ResponseEntity.ok(new AuthResponse("User does not exist.", 401));
            }

            try {
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

            } catch (BadCredentialsException _e) {
                return ResponseEntity.ok(new AuthResponse("Wrong password", 400));
            } catch (Exception _e) {
                return ResponseEntity.ok(new AuthResponse("Something went terribly wrong!", 402));
            }

            final AuthResponse authResponse = new AuthResponse("Sign in successful!", 200);
            authResponse.setUserUID(userRepository.findUserByEmail(authRequest.getEmail()).getId());

            return ResponseEntity.ok(authResponse);

//            if (user.getPassword().equals(authRequest.getPassword())) {
//                return ResponseEntity.ok(new AuthResponse("Sign in successful!", 200));
//            } else {
//            }
        }

    }
}
