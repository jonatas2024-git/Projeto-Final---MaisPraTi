package com.maisprati.portaldevagas.infra.exceptions.error;

public record ErrorResponse(
        String message,
        String code,
        String path,
        String timestamp
) {
}
