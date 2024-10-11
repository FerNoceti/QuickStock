package dev.fer.quickstock.controller;

import dev.fer.quickstock.dto.user.User;
import dev.fer.quickstock.dto.user.UserLogin;
import dev.fer.quickstock.dto.user.UserResponse;
import dev.fer.quickstock.service.user.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/user")
    public ResponseEntity<UserResponse> saveUser(@Valid @RequestBody User user) {
        return userService.saveUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@Valid @RequestBody UserLogin userLogin) {
        return userService.loginUser(userLogin);
    }
}
