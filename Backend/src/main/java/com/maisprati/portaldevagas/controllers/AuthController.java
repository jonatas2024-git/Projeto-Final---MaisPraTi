package com.maisprati.portaldevagas.controllers;

import com.maisprati.portaldevagas.dto.LoginRequestDTO;
import com.maisprati.portaldevagas.dto.RegisterRequestDTO;
import com.maisprati.portaldevagas.dto.ResponseDTO;
import com.maisprati.portaldevagas.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService service;

    public AuthController(AuthService service){
        this.service = service;
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseDTO> login(@Valid @RequestBody LoginRequestDTO body){
        return ResponseEntity.ok(service.login(body));
    }

    @PostMapping("/register")
    public ResponseEntity<ResponseDTO> register(@Valid @RequestBody RegisterRequestDTO body){
        return ResponseEntity.ok(service.register(body));
    }
}
