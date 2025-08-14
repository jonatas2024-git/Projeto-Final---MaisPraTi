package com.maisprati.portaldevagas.controllers;

import com.maisprati.portaldevagas.dto.LoginRequestDTO;
import com.maisprati.portaldevagas.dto.RegisterRequestDTO;
import com.maisprati.portaldevagas.dto.ResponseDTO;
import com.maisprati.portaldevagas.infra.security.TokenService;
import com.maisprati.portaldevagas.models.user.LoginUser;
import com.maisprati.portaldevagas.models.user.LoginUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final LoginUserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<ResponseDTO> login(@RequestBody LoginRequestDTO body){
        LoginUser user = this.repository.findByLogin(body.login()).orElseThrow(()-> new RuntimeException("User not found."));

        if (passwordEncoder.matches(body.password(), user.getPassword())) {
            String token = this.tokenService.generatedToken(user);
            return ResponseEntity.ok(new ResponseDTO(user.getLogin(), token, user.getTypeUser()));
        }

        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/register")
    public ResponseEntity<ResponseDTO> register(@RequestBody RegisterRequestDTO body){
        Optional<LoginUser> user = this.repository.findByLogin(body.login());

        if (user.isEmpty()) {
            LoginUser newUser = new LoginUser();
            newUser.setLogin(body.login());
            newUser.setPassword(passwordEncoder.encode(body.password()));
            newUser.setTypeUser(body.typeUser());
            this.repository.save(newUser);

            String token = this.tokenService.generatedToken(newUser);
            return ResponseEntity.ok(new ResponseDTO(newUser.getLogin(), token, newUser.getTypeUser()));
        }

        return ResponseEntity.badRequest().build();
    }
}
