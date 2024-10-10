package dev.fer.quickstock.dto;

public class UserResponse {
    private String username;

    public UserResponse() {}

    public UserResponse(String username) {
        this.username = username;
    }

    // Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}