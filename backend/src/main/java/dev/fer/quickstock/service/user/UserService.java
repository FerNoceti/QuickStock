package dev.fer.quickstock.service.user;

import dev.fer.quickstock.dto.user.User;
import dev.fer.quickstock.dto.user.UserLogin;
import dev.fer.quickstock.dto.user.UserResponse;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;

public interface UserService {
    ResponseEntity<UserResponse> saveUser(User user);

    ResponseEntity<String> loginUser(UserLogin userLogin);

    ResponseEntity<Void> logoutUser(String username, String token);

    ResponseEntity<UserResponse> updateUser(String username, User user, String token);
}
