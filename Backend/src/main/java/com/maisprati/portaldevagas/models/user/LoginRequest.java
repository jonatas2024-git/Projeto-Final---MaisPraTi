package com.maisprati.portaldevagas.models.user;

import lombok.Data;

@Data
public class LoginRequest {
    private String login;
    private String password;
}
