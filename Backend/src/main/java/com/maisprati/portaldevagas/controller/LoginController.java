package com.maisprati.portaldevagas.controller;

import com.maisprati.portaldevagas.models.user.AuthService;
import com.maisprati.portaldevagas.models.user.LoginRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
@RequiredArgsConstructor
public class LoginController {

    private final AuthService authService;

    @GetMapping
    public ResponseEntity<String> login(@RequestBody LoginRequest req){
        return ResponseEntity.ok(authService.login(req));
    }
}
