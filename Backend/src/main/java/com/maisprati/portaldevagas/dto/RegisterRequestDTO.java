package com.maisprati.portaldevagas.dto;

import com.maisprati.portaldevagas.models.user.TypeUser;

public record RegisterRequestDTO(String login, String password, TypeUser typeUser) {
}
