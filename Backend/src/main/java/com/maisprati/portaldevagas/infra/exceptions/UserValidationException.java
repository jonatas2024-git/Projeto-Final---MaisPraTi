package com.maisprati.portaldevagas.infra.exceptions;

import org.springframework.http.HttpStatus;

public class UserValidationException extends RuntimeException {

    public UserValidationException(String message) {
        super(message);
    }
}
