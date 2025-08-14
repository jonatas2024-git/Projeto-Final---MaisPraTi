package com.maisprati.portaldevagas.dto;

import com.maisprati.portaldevagas.models.user.TypeUser;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RegisterRequestDTO(
        @NotBlank(message = "Login é obrigatório") String login,
        @NotBlank(message = "Password é obrigatório") String password,
        @NotNull(message = "O tipo de pefil é obrigatório") TypeUser typeUser) {
}
