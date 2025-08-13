package com.maisprati.portaldevagas.models.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final LoginUserRepository loginUserRepository;

    public String login(LoginRequest req) {
        LoginUser loginUser = loginUserRepository.findByLogin(req.getLogin())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));

        if (!loginUser.getPassword().equals(req.getPassword())){
            throw new RuntimeException("Senha inválida");
        }

        return "Login realizado com sucesso";
    }
}
