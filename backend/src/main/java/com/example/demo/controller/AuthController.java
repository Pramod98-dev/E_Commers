package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        String role = body.get("role");
        return userService.login(email, password, role)
                .map(user -> ResponseEntity.ok(Map.of(
                    "id", user.getId(),
                    "name", user.getName(),
                    "email", user.getEmail(),
                    "role", user.getRole()
                )))
                .orElse(ResponseEntity.status(401).body(Map.of("error", "Invalid credentials")));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, String> body) {
        String name = body.get("name");
        String email = body.get("email");
        String password = body.get("password");
        try {
            User user = userService.registerUser(name, email, password);
            return ResponseEntity.ok(Map.of(
                "id", user.getId(),
                "name", user.getName(),
                "email", user.getEmail(),
                "role", user.getRole()
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/admin/signup")
    public ResponseEntity<?> adminSignup(@RequestBody Map<String, String> body) {
        String name = body.get("name");
        String email = body.get("email");
        String password = body.get("password");
        try {
            User admin = userService.registerAdmin(name, email, password);
            return ResponseEntity.ok(Map.of(
                "id", admin.getId(),
                "name", admin.getName(),
                "email", admin.getEmail(),
                "role", admin.getRole()
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
