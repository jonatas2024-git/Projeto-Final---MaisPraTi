package com.maisprati.portaldevagas.dto;

import com.maisprati.portaldevagas.models.user.TypeUser;

public record ResponseDTO(String login, TypeUser typeUser, String token) {
}
