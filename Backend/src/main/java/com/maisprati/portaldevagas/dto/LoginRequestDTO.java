package com.maisprati.portaldevagas.dto;

import jakarta.validation.constraints.NotBlank;

public record LoginRequestDTO (
        @NotBlank(message = "Login é obrigatório") String login,
        @NotBlank(message = "Password é obrigatório") String password
) {}
