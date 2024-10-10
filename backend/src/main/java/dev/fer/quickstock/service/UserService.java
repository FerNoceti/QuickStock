package dev.fer.quickstock.service;

import dev.fer.quickstock.dto.User;
import dev.fer.quickstock.dto.UserLogin;
import dev.fer.quickstock.dto.UserResponse;
import org.springframework.http.ResponseEntity;

public interface UserService {
    ResponseEntity<UserResponse> saveUser(User user);

    ResponseEntity<String> loginUser(UserLogin userLogin);

}
