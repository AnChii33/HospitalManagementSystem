package dev.hms.hospital_management_system.controller;

import dev.hms.hospital_management_system.auth.JWTUtil;
import dev.hms.hospital_management_system.dto.LoginRequest;
import dev.hms.hospital_management_system.model.User;
import dev.hms.hospital_management_system.service.UserService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AuthController {
    private final UserService userService;
    private final JWTUtil jwtUtil;

    @Autowired
    public AuthController(UserService userService, JWTUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        User user = userService.findUserByLoginIdAndPassword(loginRequest.getLoginID(), loginRequest.getPassword());

        if (user != null) {
            String token = jwtUtil.generateToken(user.getLoginID(), user.getRole());
            return ResponseEntity.ok(new LoginResponse("Login successful", user.getRole(), user.getLoginID(), token));
        } else {
            return ResponseEntity.status(401).body(new ErrorResponse("Invalid credentials"));
        }
    }

    @Data
    public static class LoginResponse {
        private String message;
        private String role;
        private String loginId;
        private String token;

        public LoginResponse(String message, String role, String loginId, String token) {
            this.message = message;
            this.role = role;
            this.loginId = loginId;
            this.token = token;
        }
    }

    @Data
    public static class ErrorResponse {
        private String errorMessage;

        public ErrorResponse(String errorMessage) {
            this.errorMessage = errorMessage;
        }
    }
}
