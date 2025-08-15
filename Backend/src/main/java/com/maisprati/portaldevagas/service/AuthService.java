package com.maisprati.portaldevagas.service;

import com.maisprati.portaldevagas.dto.LoginRequestDTO;
import com.maisprati.portaldevagas.dto.RegisterRequestDTO;
import com.maisprati.portaldevagas.dto.ResponseDTO;
import com.maisprati.portaldevagas.infra.exceptions.AuthenticationException;
import com.maisprati.portaldevagas.infra.exceptions.BusinessException;
import com.maisprati.portaldevagas.infra.exceptions.UserValidationException;
import com.maisprati.portaldevagas.infra.security.TokenService;
import com.maisprati.portaldevagas.models.user.LoginUser;
import com.maisprati.portaldevagas.models.user.LoginUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service

public class AuthService {
    @Autowired
    private LoginUserRepository repository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private TokenService tokenService;

    public ResponseDTO login(LoginRequestDTO body) {
        var user = repository.findByLogin(body.login())
                .orElseThrow(() -> new AuthenticationException("Credenciais inválidas"));

        if (!passwordEncoder.matches(body.password(), user.getPassword())) {
            throw new AuthenticationException("Credenciais inválidas");
        }

        String token = tokenService.generatedToken(user);
        return new ResponseDTO(user.getLogin(), user.getTypeUser(), token);
    }

    public ResponseDTO register(RegisterRequestDTO body){
        Optional<LoginUser> user = this.repository.findByLogin(body.login());

        if (user.isPresent()) {
            throw new UserValidationException("Usuário já cadastrado.");
        }

        LoginUser newUser = new LoginUser();
        newUser.setLogin(body.login());
        newUser.setPassword(passwordEncoder.encode(body.password()));
        newUser.setTypeUser(body.typeUser());
        this.repository.save(newUser);
        String token = this.tokenService.generatedToken(newUser);

        return new ResponseDTO(newUser.getLogin(), newUser.getTypeUser(), token);
    }
}
