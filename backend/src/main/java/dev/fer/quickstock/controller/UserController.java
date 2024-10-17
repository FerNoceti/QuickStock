package dev.fer.quickstock.controller;

import dev.fer.quickstock.dto.user.LoginResponse;
import dev.fer.quickstock.dto.user.User;
import dev.fer.quickstock.dto.user.UserLogin;
import dev.fer.quickstock.dto.user.UserResponse;
import dev.fer.quickstock.service.user.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> saveUser(@Valid @RequestBody User user) {
        return userService.saveUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(@Valid @RequestBody UserLogin userLogin) {
        return userService.loginUser(userLogin);
    }

    @PostMapping("/logout/{username}")
    public ResponseEntity<Void> logoutUser(@PathVariable String username, @RequestHeader("Authorization") String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String token = authorizationHeader.substring(7);
        return userService.logoutUser(username, token);
    }
}
