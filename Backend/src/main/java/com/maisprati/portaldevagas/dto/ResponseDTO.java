package com.maisprati.portaldevagas.dto;

import com.maisprati.portaldevagas.models.user.TypeUser;

public record ResponseDTO(String login, String token, TypeUser typeUser) {
}
