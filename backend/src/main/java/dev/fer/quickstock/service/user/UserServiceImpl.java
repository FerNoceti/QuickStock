package dev.fer.quickstock.service.user;

import dev.fer.quickstock.dto.user.User;
import dev.fer.quickstock.dto.user.UserLogin;
import dev.fer.quickstock.dto.user.UserResponse;
import dev.fer.quickstock.repository.UserRepository;
import dev.fer.quickstock.security.JwtTokenService;
import dev.fer.quickstock.security.TokenBlacklistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JwtTokenService jwtTokenService;
    private final TokenBlacklistService tokenBlacklistService;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder, JwtTokenService jwtTokenService, TokenBlacklistService tokenBlacklistService) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.jwtTokenService = jwtTokenService;
        this.tokenBlacklistService = tokenBlacklistService;
    }

    @Override
    public ResponseEntity<UserResponse> saveUser(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        UserResponse userResponse = new UserResponse(user.getUsername(), user.getEmail());
        return new ResponseEntity<>(userResponse, HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<String> loginUser(UserLogin userLogin) {
        User user = userRepository.findById(userLogin.getUsername()).orElse(null);

        if (user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }

        if (!bCryptPasswordEncoder.matches(userLogin.getPassword(), user.getPassword())) {
            return new ResponseEntity<>("Incorrect password", HttpStatus.UNAUTHORIZED);
        }

        String token = jwtTokenService.generateToken(user.getUsername());
        return new ResponseEntity<>(token, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Void> logoutUser(String username, String token) {
        User user = userRepository.findById(username).orElse(null);

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        if (!jwtTokenService.validateToken(token, user.getUsername())) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        tokenBlacklistService.revokeToken(token);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Override
    public ResponseEntity<UserResponse> updateUser(String username, User user, String token) {
        return null;
    }
}
