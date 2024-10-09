package dev.fer.quickstock.service;

import dev.fer.quickstock.dto.User;
import dev.fer.quickstock.repository.UserRepository;
import dev.fer.quickstock.service.UserService;
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
    public ResponseEntity<User> saveUser(User user) {
        user.setPasswordHash(bCryptPasswordEncoder.encode(user.getPasswordHash()));
        userRepository.save(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }
}
