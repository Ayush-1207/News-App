package me.aryanrawlani.BackendHackerNews.model.Auth;

import lombok.Data;

@Data
public class AuthResponse {
    private String response;
    private int responseCode;

    private String userUID;

    public AuthResponse(String response, int responseCode) {
        this.response = response;
        this.responseCode = responseCode;
    }
}
