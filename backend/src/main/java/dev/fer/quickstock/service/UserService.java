package dev.fer.quickstock.service;

import dev.fer.quickstock.dto.User;
import org.springframework.http.ResponseEntity;

public interface UserService {
    ResponseEntity<User> saveUser(User user);

}
