package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User registerUser(String name, String email, String password) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already in use");
        }
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole("user");
        return userRepository.save(user);
    }

    public User registerAdmin(String name, String email, String password) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already in use");
        }
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole("admin");
        return userRepository.save(user);
    }

    public Optional<User> login(String email, String password, String role) {
        Optional<User> userOpt = userRepository.findByEmailAndRole(email, role);
        if (userOpt.isPresent() && passwordEncoder.matches(password, userOpt.get().getPassword())) {
            return userOpt;
        }
        return Optional.empty();
    }
}
