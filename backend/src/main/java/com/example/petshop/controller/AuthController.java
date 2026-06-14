package com.example.petshop.controller;

import com.example.petshop.dto.LoginDTO;
import com.example.petshop.model.User;
import com.example.petshop.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDTO loginDTO) {
        Optional<User> userOpt = userRepository.findByUsername(loginDTO.username());
        
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (user.getPassword().equals(loginDTO.password())) {
                return ResponseEntity.ok("Login success");
            }
        }
        
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }
}
