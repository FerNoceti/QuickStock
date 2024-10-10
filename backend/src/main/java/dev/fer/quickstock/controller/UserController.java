package dev.fer.quickstock.controller;

import dev.fer.quickstock.dto.User;
import dev.fer.quickstock.dto.UserResponse;
import dev.fer.quickstock.service.UserService;
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

}
