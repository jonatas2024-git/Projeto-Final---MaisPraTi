package com.maisprati.portaldevagas.infra.exceptions.error;

import java.util.List;

public record ValidationErrorResponse(
        String message,
        String code,
        String path,
        String timestamp,
        List<FieldErrorItem> errors
) {
    public record FieldErrorItem(String field, String error){}
}
