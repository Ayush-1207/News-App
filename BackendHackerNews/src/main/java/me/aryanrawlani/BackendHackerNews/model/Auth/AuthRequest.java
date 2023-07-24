package me.aryanrawlani.BackendHackerNews.model.Auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class AuthRequest {
    @JsonProperty
    private boolean isSignup;

    private String email;
    private String username;
    private String password;

    public boolean isSignup() {
        return isSignup;
    }
}
