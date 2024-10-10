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

    @NotNull(message = "Password cannot be null")
    @Column(name = "password", nullable = false)
    private String password;

    // Constructors
    public User() {
    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
