package dev.fer.quickstock.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "users")
public class User {

    // Attributes
    @Id
    @NotNull(message = "Username cannot be null")
    @Column(name = "username", nullable = false)
    private String username;

    @NotNull(message = "Password hash cannot be null")
    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    // Constructors
    public User() {
    }

    public User(String username, String passwordHash) {
        this.username = username;
        this.passwordHash = passwordHash;
    }

    // Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

}
