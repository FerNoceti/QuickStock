package dev.fer.quickstock.service;

import dev.fer.quickstock.dto.User;
import dev.fer.quickstock.dto.UserResponse;
import dev.fer.quickstock.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public ResponseEntity<UserResponse> saveUser(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        UserResponse userResponse = new UserResponse(user.getUsername());
        return new ResponseEntity<>(userResponse, HttpStatus.CREATED);
    }
}
