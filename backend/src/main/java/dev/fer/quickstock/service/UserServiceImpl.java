package dev.fer.quickstock.service;

import dev.fer.quickstock.dto.User;
import dev.fer.quickstock.dto.UserLogin;
import dev.fer.quickstock.dto.UserResponse;
import dev.fer.quickstock.repository.UserRepository;
import dev.fer.quickstock.security.JwtTokenService;
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

    @Autowired
    public UserServiceImpl(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder, JwtTokenService jwtTokenService) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.jwtTokenService = jwtTokenService;
    }

    @Override
    public ResponseEntity<UserResponse> saveUser(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        UserResponse userResponse = new UserResponse(user.getUsername());
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


    }